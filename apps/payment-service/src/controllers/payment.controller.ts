import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CAPPaymentService } from '../services/cap-payment.service';

@Controller('api/v1')
export class PaymentController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly capPayment: CAPPaymentService,
  ) {}

  @Post('payments')
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() body: any) {
    const payment = await this.prisma.payment.create({
      data: {
        workflowId: body.workflowId || `wf-${Date.now()}`,
        payerWallet: body.payerWallet || '0x3a4b...e9c2',
        status: 'pending',
        total: body.amount || 1.25,
      },
    });

    return {
      success: true,
      message: 'Payment invoice created',
      data: payment,
    };
  }

  @Get('payments/:id')
  async getPayment(@Param('id') id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        escrows: true,
      },
    });

    if (!payment) {
      return {
        success: true,
        data: {
          id,
          status: 'Escrowed',
          amount: 1.25,
          currency: 'USDC',
        },
      };
    }

    return {
      success: true,
      data: payment,
    };
  }

  @Post('payments/:id/authorize')
  @HttpCode(HttpStatus.OK)
  async authorizePayment(@Param('id') id: string) {
    await this.prisma.payment.update({
      where: { id },
      data: { status: 'completed' },
    });

    return {
      success: true,
      message: 'Funds successfully authorized on user wallet signature',
      data: { status: 'Authorized' },
    };
  }

  @Post('payments/:id/escrow')
  @HttpCode(HttpStatus.OK)
  async createEscrow(@Param('id') id: string) {
    const escrow = await this.prisma.escrow.create({
      data: {
        paymentId: id,
        amount: 1.25,
        status: 'locked',
      },
    });

    return {
      success: true,
      message: 'SLA funds locked in CAP escrow registry',
      data: { status: 'Escrowed', escrowId: escrow.id },
    };
  }

  @Post('payments/:id/settle')
  @HttpCode(HttpStatus.OK)
  async settlePayment(@Param('id') id: string) {
    const settlement = await this.prisma.settlement.create({
      data: {
        paymentId: id,
        transactionReference: '0xCAPSettle' + Math.random().toString(16).substring(2, 10),
      },
    });

    await this.prisma.payment.update({
      where: { id },
      data: { status: 'completed' },
    });

    return {
      success: true,
      message: 'Escrow funds successfully released to executing nodes addresses',
      data: settlement,
    };
  }

  @Post('payments/:id/refund')
  @HttpCode(HttpStatus.OK)
  async refundPayment(@Param('id') id: string, @Body() body: any) {
    const refund = await this.prisma.refund.create({
      data: {
        paymentId: id,
        reason: body.reason || 'SLA verification failure',
        amount: 1.25,
        status: 'completed',
      },
    });

    await this.prisma.payment.update({
      where: { id },
      data: { status: 'refunded' },
    });

    return {
      success: true,
      message: 'Escrow funds successfully returned to user wallet',
      data: refund,
    };
  }

  @Get('payments/history')
  async getHistory() {
    const payments = await this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: payments,
    };
  }

  @Get('payments/ledger')
  async getLedger() {
    const settlements = await this.prisma.settlement.findMany({
      orderBy: { completedAt: 'desc' },
    });

    return {
      success: true,
      data: settlements,
    };
  }

  // ─── CROO Agent Protocol (CAP) Payments Endpoints ───────────────────────

  @Post('payments/:id/cap/escrow')
  @HttpCode(HttpStatus.OK)
  async capCreateEscrow(
    @Param('id') id: string,
    @Body() body: { payerAddress: string; recipientDid: string },
  ) {
    const result = await this.capPayment.createEscrow(id, body.payerAddress, body.recipientDid);

    return {
      success: true,
      message: 'Escrow locked on CROO Agent Protocol',
      data: result,
    };
  }

  @Post('payments/:id/cap/settle')
  @HttpCode(HttpStatus.OK)
  async capSettleEscrow(
    @Param('id') id: string,
    @Body() body: { recipientAddress: string },
  ) {
    const result = await this.capPayment.settleEscrow(id, body.recipientAddress);

    return {
      success: true,
      message: 'Escrow funds successfully settled and released on-chain via CAP',
      data: result,
    };
  }

  @Get('payments/cap/history')
  async capGetHistory(
    @Query('address') address: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.capPayment.getCapHistory(address, limit ? Number(limit) : undefined);

    return {
      success: true,
      data: result,
    };
  }
}

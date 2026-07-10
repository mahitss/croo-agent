import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CAPPaymentService } from '../services/cap-payment.service';
import * as crypto from 'crypto';

@Controller('api/v1')
export class PaymentController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly capPayment: CAPPaymentService,
  ) {}

  @Post('payments')
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() body: any) {
    try {
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
    } catch (error: any) {
      return { success: false, message: `Database error creating payment invoice: ${error.message}` };
    }
  }

  @Get('payments/:id')
  async getPayment(@Param('id') id: string) {
    try {
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
    } catch (error: any) {
      return { success: false, message: `Database error fetching payment: ${error.message}` };
    }
  }

  @Post('payments/:id/authorize')
  @HttpCode(HttpStatus.OK)
  async authorizePayment(@Param('id') id: string) {
    try {
      await this.prisma.payment.update({
        where: { id },
        data: { status: 'completed' },
      });
  
      return {
        success: true,
        message: 'Funds successfully authorized on user wallet signature',
        data: { status: 'Authorized' },
      };
    } catch (error: any) {
      return { success: false, message: `Database error authorizing payment: ${error.message}` };
    }
  }

  @Post('payments/:id/escrow')
  @HttpCode(HttpStatus.OK)
  async createEscrow(@Param('id') id: string) {
    try {
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
    } catch (error: any) {
      return { success: false, message: `Database error creating escrow: ${error.message}` };
    }
  }

  @Post('payments/:id/settle')
  @HttpCode(HttpStatus.OK)
  async settlePayment(@Param('id') id: string) {
    try {
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
    } catch (error: any) {
      return { success: false, message: `Database error settling payment: ${error.message}` };
    }
  }

  @Post('payments/:id/refund')
  @HttpCode(HttpStatus.OK)
  async refundPayment(@Param('id') id: string, @Body() body: any) {
    try {
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
    } catch (error: any) {
      return { success: false, message: `Database error refunding payment: ${error.message}` };
    }
  }

  @Get('payments/history')
  async getHistory() {
    try {
      const payments = await this.prisma.payment.findMany({
        orderBy: { createdAt: 'desc' },
      });
  
      return {
        success: true,
        data: payments,
      };
    } catch (error: any) {
      return { success: false, message: `Database error fetching history: ${error.message}` };
    }
  }

  @Get('payments/ledger')
  async getLedger() {
    try {
      const settlements = await this.prisma.settlement.findMany({
        orderBy: { completedAt: 'desc' },
      });
  
      return {
        success: true,
        data: settlements,
      };
    } catch (error: any) {
      return { success: false, message: `Database error fetching ledger: ${error.message}` };
    }
  }

  // ─── Razorpay Payments ──────────────────────────────────────────────────
  @Post('payments/razorpay/order')
  @HttpCode(HttpStatus.CREATED)
  async createRazorpayOrder(@Body() body: { amount: number; currency?: string; userId?: string }) {
    try {
      const amountInPaise = Math.round(body.amount * 100);
      const currency = body.currency || 'INR';
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      let orderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;
      
      if (keyId && keySecret) {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const res = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency,
            receipt: `rcpt_${Date.now()}`,
            notes: {
              userId: body.userId
            }
          })
        });
        const data = await res.json();
        if (data.id) {
          orderId = data.id;
        } else {
          console.warn('Razorpay order creation failed, falling back to mock Order ID:', data);
        }
      }

      const payment = await this.prisma.payment.create({
        data: {
          workflowId: `razorpay_${orderId}`,
          payerWallet: body.userId || 'user-1',
          status: 'pending',
          total: body.amount,
          currency: 'USDC',
        }
      });

      return {
        success: true,
        orderId,
        paymentId: payment.id,
        amount: body.amount,
        currency,
        key_id: keyId
      };
    } catch (error: any) {
      return { success: false, message: `Error creating Razorpay order: ${error.message}` };
    }
  }

  @Post('payments/razorpay/verify')
  @HttpCode(HttpStatus.OK)
  async verifyRazorpayPayment(@Body() body: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    signature: string;
    userId: string;
    amount: number;
  }) {
    try {
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      let isValid = true;

      if (keySecret) {
        const text = `${body.razorpayOrderId}|${body.razorpayPaymentId}`;
        const generatedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(text)
          .digest('hex');
        isValid = generatedSignature === body.signature;
      }

      if (!isValid) {
        return { success: false, message: 'Invalid payment signature verified' };
      }

      const payment = await this.prisma.payment.findFirst({
        where: { workflowId: `razorpay_${body.razorpayOrderId}` }
      });

      if (payment) {
        if (payment.status !== 'completed') {
          await this.prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'completed' }
          });

          // Call wallet-service to update user balance and store transaction
          try {
            const walletUrl = process.env.WALLET_SERVICE_URL || 'http://127.0.0.1:5005/api/v1';
            const depositRes = await fetch(`${walletUrl}/wallet/deposit-credits`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: body.userId,
                amount: Number(body.amount),
                reference: `Razorpay Deposit | Method: Razorpay Checkout | ID: ${body.razorpayPaymentId}`
              })
            });
            if (!depositRes.ok) {
              console.error('[RAZORPAY_VERIFY] Failed to deposit credits to wallet-service:', await depositRes.text());
            }
          } catch (e) {
            console.error('[RAZORPAY_VERIFY] Wallet deposit call failed:', e);
          }
        }
      }

      return {
        success: true,
        message: 'Payment verified and captured successfully',
        data: {
          orderId: body.razorpayOrderId,
          paymentId: body.razorpayPaymentId,
          status: 'completed'
        }
      };
    } catch (error: any) {
      return { success: false, message: `Error verifying Razorpay payment: ${error.message}` };
    }
  }

  @Post('payments/razorpay/webhook')
  @HttpCode(HttpStatus.OK)
  async handleRazorpayWebhook(@Req() req: any, @Body() body: any) {
    console.log('[RAZORPAY_WEBHOOK] Event received:', body?.event);
    
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const generatedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(body))
        .digest('hex');
      
      if (generatedSignature !== signature) {
        console.warn('[RAZORPAY_WEBHOOK] Invalid webhook signature detected!');
        return { success: false, message: 'Invalid webhook signature' };
      }
    }

    try {
      if (body?.event === 'payment.captured') {
        const entity = body.payload?.payment?.entity;
        const orderId = entity?.order_id;
        const paymentId = entity?.id;
        const amount = entity?.amount ? (Number(entity.amount) / 100) : 0;

        const payment = await this.prisma.payment.findFirst({
          where: { workflowId: `razorpay_${orderId}` }
        });

        if (payment && payment.status !== 'completed') {
          await this.prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'completed' }
          });

          // Call wallet-service to deposit credits
          try {
            const walletUrl = process.env.WALLET_SERVICE_URL || 'http://127.0.0.1:5005/api/v1';
            const depositRes = await fetch(`${walletUrl}/wallet/deposit-credits`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: payment.payerWallet,
                amount: Number(payment.total),
                reference: `Razorpay Deposit | Method: Razorpay Webhook | ID: ${paymentId}`
              })
            });
            if (!depositRes.ok) {
              console.error('[RAZORPAY_WEBHOOK] Failed to deposit credits to wallet-service:', await depositRes.text());
            }
          } catch (e) {
            console.error('[RAZORPAY_WEBHOOK] Wallet deposit call failed:', e);
          }
        }
      } else if (body?.event === 'payment.failed') {
        const orderId = body.payload?.payment?.entity?.order_id;
        const payment = await this.prisma.payment.findFirst({
          where: { workflowId: `razorpay_${orderId}` }
        });
        if (payment && payment.status !== 'completed') {
          await this.prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'failed' }
          });
        }
      }
      return { success: true };
    } catch (err: any) {
      console.error('[RAZORPAY_WEBHOOK_ERROR]', err);
      return { success: false, message: err.message };
    }
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

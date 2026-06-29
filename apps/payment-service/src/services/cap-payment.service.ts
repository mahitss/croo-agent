import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CAPClient } from '@nexus-ai/cap-sdk';

@Injectable()
export class CAPPaymentService {
  private readonly logger = new Logger(CAPPaymentService.name);
  private readonly capClient: CAPClient;

  constructor(private readonly prisma: PrismaService) {
    this.capClient = new CAPClient();
  }

  /**
   * Lock funds in escrow on the CROO CAP network.
   */
  async createEscrow(
    paymentId: string,
    payerAddress: string,
    recipientDid: string,
  ): Promise<any> {
    this.logger.log(`Locking escrow for payment: ${paymentId}`);

    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error(`Payment instance ${paymentId} not found`);
    }

    const amount = Number(payment.total);

    // Call CAP SDK to lock escrow on-chain
    const capEscrow = await this.capClient.createEscrow(
      paymentId,
      amount,
      payerAddress,
      recipientDid,
    );

    // Persist escrow record locally
    const escrow = await this.prisma.escrow.create({
      data: {
        paymentId,
        amount,
        status: 'locked',
      },
    });

    // Save transaction reference in local database
    await this.prisma.settlement.create({
      data: {
        paymentId,
        transactionReference: capEscrow.transactionHash,
      },
    });

    this.logger.log(
      `Escrow created for payment ${paymentId} with transaction hash ${capEscrow.transactionHash}`,
    );

    return {
      success: true,
      escrow,
      capEscrow,
    };
  }

  /**
   * Release CAP escrow funds on verified delivery.
   */
  async settleEscrow(paymentId: string, recipientAddress: string): Promise<any> {
    this.logger.log(`Settling payment ${paymentId} and releasing escrow to ${recipientAddress}`);

    const escrow = await this.prisma.escrow.findFirst({
      where: { paymentId, status: 'locked' },
    });

    if (!escrow) {
      throw new Error(`No locked escrow found for payment ${paymentId}`);
    }

    // Call CAP SDK to settle escrow
    const capSettlement = await this.capClient.settleEscrow(escrow.id, recipientAddress);

    // Update escrow local state
    await this.prisma.escrow.update({
      where: { id: escrow.id },
      data: {
        status: 'released',
        releasedAt: new Date(),
      },
    });

    // Update payment local status
    await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'completed' },
    });

    // Add settlement record
    const settlement = await this.prisma.settlement.create({
      data: {
        paymentId,
        transactionReference: capSettlement.transactionHash,
      },
    });

    this.logger.log(`Escrow successfully released for payment ${paymentId}`);

    return {
      success: true,
      settlement,
      capSettlement,
    };
  }

  /**
   * Get CAP transaction history from ledger.
   */
  async getCapHistory(walletAddress: string, limit?: number): Promise<any[]> {
    this.logger.log(`Fetching transaction history from CAP ledger for: ${walletAddress}`);
    return this.capClient.getTransactionHistory(walletAddress, limit);
  }
}

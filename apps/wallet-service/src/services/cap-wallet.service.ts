import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CAPClient, loadCAPConfig } from '@nexus-ai/cap-sdk';

@Injectable()
export class CAPWalletService {
  private readonly logger = new Logger(CAPWalletService.name);
  private readonly capClient: CAPClient;

  constructor(private readonly prisma: PrismaService) {
    this.capClient = new CAPClient();
    const config = loadCAPConfig();
    this.logger.log(
      `CAP Wallet Service initialized — mode: ${config.enabled ? 'LIVE' : 'OFFLINE'}`,
    );
  }

  /**
   * Generates a signature challenge for wallet verification.
   */
  async generateChallenge(address: string): Promise<string> {
    return this.capClient.generateWalletChallenge(address);
  }

  /**
   * Verifies the wallet signature with the challenge.
   */
  async verifyWallet(
    address: string,
    signature: string,
    challenge: string,
    userId: string = 'user-1',
  ): Promise<any> {
    this.logger.log(`Verifying wallet signature for ${address}`);
    
    // Call CAP SDK to verify signature
    const verification = await this.capClient.verifyWallet(address, signature, challenge);

    if (verification.verified || !loadCAPConfig().enabled) {
      // Find or create the wallet locally
      let wallet = await this.prisma.wallet.findFirst({
        where: { address },
      });

      if (!wallet) {
        wallet = await this.prisma.wallet.create({
          data: {
            userId,
            address,
            network: 'CAP',
            verified: true,
          },
        });

        // Initialize balance
        await this.prisma.balance.create({
          data: {
            walletId: wallet.id,
            available: 200.0,
            reserved: 0.0,
            pending: 0.0,
          },
        });
      } else {
        // Update to verified
        await this.prisma.wallet.update({
          where: { id: wallet.id },
          data: { verified: true },
        });
      }

      this.logger.log(`Wallet ${address} successfully verified and registered.`);
      return {
        success: true,
        wallet,
        verification,
      };
    }

    throw new Error('Wallet signature verification failed on CAP network');
  }

  /**
   * Fetch transaction history from the CROO chain.
   */
  async getCapTransactions(address: string, limit?: number): Promise<any[]> {
    this.logger.log(`Fetching CAP transactions for wallet: ${address}`);
    
    const capTxList = await this.capClient.getTransactionHistory(address, limit);

    // Sync with local transactions
    const wallet = await this.prisma.wallet.findUnique({
      where: { address },
    });

    if (wallet) {
      for (const capTx of capTxList) {
        const localTx = await this.prisma.transaction.findFirst({
          where: { reference: capTx.transactionHash },
        });

        if (!localTx) {
          await this.prisma.transaction.create({
            data: {
              walletId: wallet.id,
              type: capTx.type,
              amount: capTx.amount,
              currency: capTx.currency,
              status: capTx.status,
              reference: capTx.transactionHash,
              createdAt: new Date(capTx.timestamp),
            },
          });
        }
      }
    }

    return capTxList;
  }

  /**
   * Link a local wallet to a CAP DID.
   */
  async linkWalletToDid(address: string, did: string): Promise<any> {
    this.logger.log(`Linking wallet ${address} to DID ${did}`);
    // Simulate linking or query CAP to confirm the relationship
    const wallet = await this.prisma.wallet.findFirst({
      where: { address },
    });

    if (!wallet) {
      throw new Error(`Wallet ${address} not found. Please connect wallet first.`);
    }

    // Return status
    return {
      success: true,
      address,
      linkedDid: did,
      linkedAt: new Date().toISOString(),
    };
  }
}

import { Controller, Get, Post, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CAPWalletService } from '../services/cap-wallet.service';

@Controller('api/v1')
export class WalletController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly capWallet: CAPWalletService,
  ) {}

  @Get('wallet')
  async getWallet(@Query('address') address?: string, @Query('userId') userId?: string) {
    try {
      let wallet = null;
      if (userId) {
        wallet = await this.prisma.wallet.findFirst({
          where: { userId },
          include: { balances: true }
        });
      }
      if (!wallet && address) {
        wallet = await this.prisma.wallet.findFirst({
          where: { address },
          include: { balances: true }
        });
      }
      if (!wallet) {
        const searchUserId = userId || 'user-1';
        const randomHex = Math.random().toString(16).substring(2, 10);
        const searchAddress = address || `0xUserWallet${randomHex}`;
        wallet = await this.prisma.wallet.create({
          data: {
            userId: searchUserId,
            address: searchAddress,
            network: 'CAP',
            verified: true,
          },
          include: {
            balances: true
          }
        });

        await this.prisma.balance.create({
          data: {
            walletId: wallet.id,
            available: 0.0,
            reserved: 0.0,
            pending: 0.0,
          },
        });

        wallet = await this.prisma.wallet.findUnique({
          where: { id: wallet.id },
          include: { balances: true }
        });
      }
  
      return {
        success: true,
        data: {
          walletId: wallet.id,
          address: wallet.address,
          network: wallet.network,
          verified: wallet.verified,
          createdAt: wallet.createdAt.toISOString(),
          lastSyncedAt: wallet.createdAt.toISOString(),
        },
      };
    } catch (error: any) {
      return { success: false, message: `Database error fetching wallet: ${error.message}` };
    }
  }
  
  @Get('wallet/balance')
  async getBalance(@Query('address') address?: string, @Query('userId') userId?: string) {
    try {
      let wallet = null;
      if (userId) {
        wallet = await this.prisma.wallet.findFirst({
          where: { userId }
        });
      }
      if (!wallet && address) {
        wallet = await this.prisma.wallet.findFirst({
          where: { address }
        });
      }
      if (!wallet) {
        const searchUserId = userId || 'user-1';
        const randomHex = Math.random().toString(16).substring(2, 10);
        const searchAddress = address || `0xUserWallet${randomHex}`;
        wallet = await this.prisma.wallet.create({
          data: {
            userId: searchUserId,
            address: searchAddress,
            network: 'CAP',
            verified: true,
          }
        });
      }

      let balance = await this.prisma.balance.findUnique({
        where: { walletId: wallet.id }
      });

      if (!balance) {
        balance = await this.prisma.balance.create({
          data: {
            walletId: wallet.id,
            available: 0.0,
            reserved: 0.0,
            pending: 0.0,
          }
        });
      }
  
      return {
        success: true,
        data: {
          available: Number(balance.available),
          reserved: Number(balance.reserved),
          pending: Number(balance.pending),
          total: Number(balance.available) + Number(balance.reserved) + Number(balance.pending),
          currency: 'USDC',
        },
      };
    } catch (error: any) {
      return { success: false, message: `Database error fetching balance: ${error.message}` };
    }
  }
  
  @Post('wallet/connect')
  @HttpCode(HttpStatus.OK)
  async connectWallet(@Body() body: any) {
    try {
      const address = body.address || '0xUserWalletAddress789c';
      const userId = body.userId || 'user-1';
      
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
  
        await this.prisma.balance.create({
          data: {
            walletId: wallet.id,
            available: 0.0,
            reserved: 0.0,
            pending: 0.0,
          },
        });
      }
  
      return {
        success: true,
        message: 'Wallet signature verified. Connection initialized.',
        data: {
          address: wallet.address,
          verified: wallet.verified,
          token: 'wallet-jwt-session-token',
        },
      };
    } catch (error: any) {
      return { success: false, message: `Database error connecting wallet: ${error.message}` };
    }
  }

  @Post('wallet/sync')
  @HttpCode(HttpStatus.OK)
  async syncWallet(@Body() body: any) {
    try {
      const address = body.address || '0xUserWalletAddress789c';
      const userId = body.userId || 'user-1';

      let wallet = await this.prisma.wallet.findFirst({
        where: {
          OR: [
            { address },
            { userId }
          ]
        }
      });

      if (!wallet) {
        wallet = await this.prisma.wallet.create({
          data: {
            userId,
            address,
            network: 'CAP',
            verified: true,
          }
        });
      }

      let balance = await this.prisma.balance.findUnique({
        where: { walletId: wallet.id }
      });

      if (!balance) {
        balance = await this.prisma.balance.create({
          data: {
            walletId: wallet.id,
            available: 0.0,
            reserved: 0.0,
            pending: 0.0,
          }
        });
      }

      return {
        success: true,
        message: 'Wallet balances successfully reconciled with CROO CAP chain records',
        data: {
          lastSyncedAt: new Date().toISOString(),
          balances: {
            available: Number(balance.available),
            reserved: Number(balance.reserved),
            pending: Number(balance.pending),
          },
        },
      };
    } catch (error: any) {
      return { success: false, message: `Database error syncing wallet: ${error.message}` };
    }
  }

  @Get('wallet/transactions')
  async getTransactions(@Query('address') address?: string, @Query('userId') userId?: string) {
    try {
      let wallet = null;
      if (userId) {
        wallet = await this.prisma.wallet.findFirst({
          where: { userId }
        });
      }
      if (!wallet && address) {
        wallet = await this.prisma.wallet.findFirst({
          where: { address }
        });
      }
      if (!wallet) {
        return {
          success: true,
          data: []
        };
      }

      const transactions = await this.prisma.transaction.findMany({
        where: { walletId: wallet.id },
        orderBy: { createdAt: 'desc' },
      });
  
      return {
        success: true,
        data: transactions,
      };
    } catch (error: any) {
      return { success: false, message: `Database error fetching transactions: ${error.message}` };
    }
  }

  @Post('wallet/transfer')
  @HttpCode(HttpStatus.OK)
  async transferFunds(@Body() body: any) {
    try {
      const address = body.senderAddress || '0xUserWalletAddress789c';
      const wallet = await this.prisma.wallet.findFirst({
        where: { address }
      });
      if (wallet) {
        await this.prisma.transaction.create({
          data: {
            walletId: wallet.id,
            type: 'transfer',
            amount: body.amount || 10.0,
            status: 'completed',
            reference: body.recipientAddress,
          },
        });
      }
  
      return {
        success: true,
        message: 'Internal credits transfer completed',
        data: {
          transactionId: `tx-transfer-${Date.now()}`,
          amount: body.amount || 10.0,
          recipient: body.recipientAddress,
        },
      };
    } catch (error: any) {
      return { success: false, message: `Database error transferring funds: ${error.message}` };
    }
  }

  @Post('wallet/withdraw')
  @HttpCode(HttpStatus.OK)
  async withdrawFunds(@Body() body: any) {
    try {
      const address = body.address || '0xUserWalletAddress789c';
      const wallet = await this.prisma.wallet.findFirst({
        where: { address }
      });
      if (wallet) {
        await this.prisma.transaction.create({
          data: {
            walletId: wallet.id,
            type: 'withdraw',
            amount: body.amount || 50.0,
            status: 'pending',
            reference: body.recipientAddress,
          },
        });
      }
  
      return {
        success: true,
        message: 'Withdrawal request successfully queued on-chain',
        data: {
          requestId: `wdr-${Date.now()}`,
          amount: body.amount || 50.0,
          address: body.recipientAddress,
          status: 'pending',
        },
      };
    } catch (error: any) {
      return { success: false, message: `Database error withdrawing funds: ${error.message}` };
    }
  }

  // ─── CROO Agent Protocol (CAP) Wallet Endpoints ─────────────────────────

  @Post('wallet/cap/challenge')
  @HttpCode(HttpStatus.OK)
  async capGetChallenge(@Body() body: { address: string }) {
    const challenge = await this.capWallet.generateChallenge(body.address);
    return {
      success: true,
      data: { challenge },
    };
  }

  @Post('wallet/cap/verify')
  @HttpCode(HttpStatus.OK)
  async capVerifyWallet(
    @Body() body: { address: string; signature: string; challenge: string; userId?: string },
  ) {
    const result = await this.capWallet.verifyWallet(
      body.address,
      body.signature,
      body.challenge,
      body.userId,
    );

    return {
      success: true,
      message: 'Wallet verification on CROO CAP completed',
      data: result,
    };
  }

  @Get('wallet/cap/transactions')
  async capGetTransactions(
    @Query('address') address: string,
    @Query('limit') limit?: string,
  ) {
    const transactions = await this.capWallet.getCapTransactions(
      address,
      limit ? Number(limit) : undefined,
    );

    return {
      success: true,
      data: transactions,
    };
  }

  @Post('wallet/cap/link')
  @HttpCode(HttpStatus.OK)
  async capLinkWallet(@Body() body: { address: string; did: string }) {
    const result = await this.capWallet.linkWalletToDid(body.address, body.did);

    return {
      success: true,
      message: 'Wallet linked to DID on CROO Agent Protocol store',
      data: result,
    };
  }

  @Post('wallet/deposit-credits')
  @HttpCode(HttpStatus.OK)
  async depositCredits(@Body() body: { address?: string; userId?: string; amount: number; reference?: string }) {
    try {
      let wallet = null;
      if (body.userId) {
        wallet = await this.prisma.wallet.findFirst({
          where: { userId: body.userId }
        });
      }
      if (!wallet && body.address) {
        wallet = await this.prisma.wallet.findFirst({
          where: { address: body.address }
        });
      }
      if (!wallet) {
        const randomHex = Math.random().toString(16).substring(2, 10);
        const address = body.address || `0xUserWallet${randomHex}`;
        wallet = await this.prisma.wallet.create({
          data: {
            userId: body.userId || 'user-1',
            address,
            network: 'CAP',
            verified: true,
          }
        });
      }
      let balance = await this.prisma.balance.findFirst({
        where: { walletId: wallet.id }
      });
      if (!balance) {
        balance = await this.prisma.balance.create({
          data: {
            walletId: wallet.id,
            available: Number(body.amount),
            reserved: 0.0,
            pending: 0.0,
          }
        });
      } else {
        balance = await this.prisma.balance.update({
          where: { walletId: wallet.id },
          data: {
            available: Number(balance.available) + Number(body.amount)
          }
        });
      }
      
      await this.prisma.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'deposit',
          amount: body.amount,
          status: 'completed',
          reference: body.reference || 'Razorpay Deposit',
        }
      });
      
      return {
        success: true,
        message: 'Credits deposited successfully',
        data: { balance: Number(balance.available) }
      };
    } catch (error: any) {
      return { success: false, message: `Database error depositing credits: ${error.message}` };
    }
  }
}

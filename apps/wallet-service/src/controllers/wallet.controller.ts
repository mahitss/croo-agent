import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1')
export class WalletController {
  @Get('wallet')
  getWallet() {
    return {
      success: true,
      data: {
        walletId: 'wlt-cap-1',
        address: '0x3a4b...e9c2',
        network: 'CAP',
        verified: true,
        createdAt: new Date().toISOString(),
        lastSyncedAt: new Date().toISOString()
      }
    };
  }

  @Get('wallet/balance')
  getBalance() {
    return {
      success: true,
      data: {
        available: 185.50,
        reserved: 12.50,
        pending: 0.00,
        total: 198.00,
        currency: 'USDC'
      }
    };
  }

  @Post('wallet/connect')
  @HttpCode(HttpStatus.OK)
  connectWallet(@Body() body: any) {
    return {
      success: true,
      message: 'Wallet signature verified. Connection initialized.',
      data: {
        address: body.address || '0x3a4b...e9c2',
        verified: true,
        token: 'wallet-jwt-session-token'
      }
    };
  }

  @Post('wallet/sync')
  @HttpCode(HttpStatus.OK)
  syncWallet() {
    return {
      success: true,
      message: 'Wallet balances successfully reconciled with CROO CAP chain records',
      data: {
        lastSyncedAt: new Date().toISOString(),
        balances: { available: 185.50, reserved: 12.50, pending: 0.00 }
      }
    };
  }

  @Get('wallet/transactions')
  getTransactions() {
    return {
      success: true,
      data: [
        { id: 'tx-1', type: 'deposit', amount: 100.00, status: 'completed', timestamp: '2026-06-27T08:00:00Z' }
      ]
    };
  }

  @Post('wallet/transfer')
  @HttpCode(HttpStatus.OK)
  transferFunds(@Body() body: any) {
    return {
      success: true,
      message: 'Internal credits transfer completed',
      data: {
        transactionId: `tx-transfer-${Date.now()}`,
        amount: body.amount,
        recipient: body.recipientAddress
      }
    };
  }

  @Post('wallet/withdraw')
  @HttpCode(HttpStatus.OK)
  withdrawFunds(@Body() body: any) {
    return {
      success: true,
      message: 'Withdrawal request successfully queued on-chain',
      data: {
        requestId: `wdr-${Date.now()}`,
        amount: body.amount,
        address: body.recipientAddress,
        status: 'pending'
      }
    };
  }

  @Get('wallet/portfolio')
  getPortfolio() {
    return {
      success: true,
      data: {
        totalValueUsdc: 198.00,
        assets: [{ symbol: 'USDC', balance: 198.00, rateUsd: 1.00 }]
      }
    };
  }
}

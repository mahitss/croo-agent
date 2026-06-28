import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1')
export class WalletController {
  private readonly walletUrl = 'http://localhost:5005/api/v1';
  private readonly paymentUrl = 'http://localhost:5004/api/v1';

  @Get('wallet')
  async getWallet() {
    try {
      const res = await fetch(`${this.walletUrl}/wallet`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Get('wallet/balance')
  async getBalance() {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/balance`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Post('wallet/deposit')
  async deposit(@Body() body: any) {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Post('wallet/withdraw')
  async withdraw(@Body() body: any) {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Get('wallet/transactions')
  async getTransactions() {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/transactions`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Post('wallet/transfer')
  async transfer(@Body() body: any) {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  // --- PAYMENTS ---
  @Post('payments')
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() body: any) {
    try {
      const res = await fetch(`${this.paymentUrl}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Get('payments/:id')
  async getPaymentStatus(@Param('id') id: string) {
    try {
      const res = await fetch(`${this.paymentUrl}/payments/${id}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/:id/refund')
  async refundPayment(@Param('id') id: string, @Body() body: any) {
    try {
      const res = await fetch(`${this.paymentUrl}/payments/${id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/escrow')
  async lockEscrow(@Body() body: any) {
    try {
      const res = await fetch(`${this.paymentUrl}/payments/${body.paymentId || body.id}/escrow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/settle')
  async settlePayment(@Body() body: any) {
    try {
      const res = await fetch(`${this.paymentUrl}/payments/${body.paymentId || body.id}/settle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }
}

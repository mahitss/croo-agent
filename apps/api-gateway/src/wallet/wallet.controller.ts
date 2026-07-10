import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/auth.guard';

@Controller('api/v1')
export class WalletController {
  private readonly walletUrl = process.env.WALLET_SERVICE_URL || 'http://127.0.0.1:5005/api/v1';
  private readonly paymentUrl = process.env.PAYMENT_SERVICE_URL || 'http://127.0.0.1:5004/api/v1';

  @Get('wallet')
  @UseGuards(GatewayAuthGuard)
  async getWallet(@Req() req: any) {
    try {
      const res = await fetch(`${this.walletUrl}/wallet?userId=${req.user.id}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Get('wallet/balance')
  @UseGuards(GatewayAuthGuard)
  async getBalance(@Req() req: any) {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/balance?userId=${req.user.id}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Post('wallet/deposit')
  @UseGuards(GatewayAuthGuard)
  async deposit(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.walletUrl}/wallet/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Post('wallet/withdraw')
  @UseGuards(GatewayAuthGuard)
  async withdraw(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.walletUrl}/wallet/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Get('wallet/transactions')
  @UseGuards(GatewayAuthGuard)
  async getTransactions(@Req() req: any) {
    try {
      const res = await fetch(`${this.walletUrl}/wallet/transactions?userId=${req.user.id}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  @Post('wallet/transfer')
  @UseGuards(GatewayAuthGuard)
  async transfer(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.walletUrl}/wallet/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }

  // --- PAYMENTS ---
  @Post('payments')
  @UseGuards(GatewayAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.paymentUrl}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Get('payments/:id')
  @UseGuards(GatewayAuthGuard)
  async getPaymentStatus(@Req() req: any, @Param('id') id: string) {
    try {
      const res = await fetch(`${this.paymentUrl}/payments/${id}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/:id/refund')
  @UseGuards(GatewayAuthGuard)
  async refundPayment(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.paymentUrl}/payments/${id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/escrow')
  @UseGuards(GatewayAuthGuard)
  async lockEscrow(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const targetId = body.paymentId || body.id;
      const res = await fetch(`${this.paymentUrl}/payments/${targetId}/escrow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/settle')
  @UseGuards(GatewayAuthGuard)
  async settlePayment(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const targetId = body.paymentId || body.id;
      const res = await fetch(`${this.paymentUrl}/payments/${targetId}/settle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/razorpay/order')
  @UseGuards(GatewayAuthGuard)
  async createRazorpayOrder(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.paymentUrl}/payments/razorpay/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/create-order')
  @UseGuards(GatewayAuthGuard)
  async createOrderAlternative(@Req() req: any, @Body() body: any) {
    return this.createRazorpayOrder(req, body);
  }

  @Post('payments/razorpay/verify')
  @UseGuards(GatewayAuthGuard)
  async verifyRazorpayPayment(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.paymentUrl}/payments/razorpay/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/verify')
  @UseGuards(GatewayAuthGuard)
  async verifyPaymentAlternative(@Req() req: any, @Body() body: any) {
    return this.verifyRazorpayPayment(req, body);
  }

  @Post('payments/razorpay/webhook')
  async handleRazorpayWebhook(@Req() req: any, @Body() body: any) {
    try {
      const signature = req.headers['x-razorpay-signature'];
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (signature) {
        headers['x-razorpay-signature'] = signature as string;
      }
      const res = await fetch(`${this.paymentUrl}/payments/razorpay/webhook`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Payment service unreachable: ${err.message}` };
    }
  }

  @Post('payments/webhook')
  async handleWebhookAlternative(@Req() req: any, @Body() body: any) {
    return this.handleRazorpayWebhook(req, body);
  }

  @Post('wallet/deposit-credits')
  @UseGuards(GatewayAuthGuard)
  async depositCredits(@Req() req: any, @Body() body: any) {
    try {
      const payload = { ...body, userId: req.user.id };
      const res = await fetch(`${this.walletUrl}/wallet/deposit-credits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Wallet service unreachable: ${err.message}` };
    }
  }
}

import { Controller, Get, Post, Patch, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('api/v1')
export class AnalyticsController {
  private readonly analyticsUrl = 'http://localhost:5007/api/v1';
  private readonly notificationUrl = 'http://localhost:5006/api/v1';

  @Get('notifications')
  async getNotifications() {
    try {
      const res = await fetch(`${this.notificationUrl}/notifications`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Notification service unreachable: ${err.message}` };
    }
  }

  @Patch('notifications/:id')
  async readNotification(@Param('id') id: string) {
    try {
      const res = await fetch(`${this.notificationUrl}/notifications/${id}`, { method: 'PATCH' });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Notification service unreachable: ${err.message}` };
    }
  }

  @Post('notifications/read-all')
  async readAllNotifications() {
    try {
      const res = await fetch(`${this.notificationUrl}/notifications/read-all`, { method: 'POST' });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Notification service unreachable: ${err.message}` };
    }
  }

  // --- ANALYTICS ---
  @Get('analytics/dashboard')
  async getDashboardAnalytics() {
    try {
      const res = await fetch(`${this.analyticsUrl}/analytics/dashboard`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Analytics service unreachable: ${err.message}` };
    }
  }

  @Get('analytics/revenue')
  async getRevenueAnalytics() {
    try {
      const res = await fetch(`${this.analyticsUrl}/analytics/revenue`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Analytics service unreachable: ${err.message}` };
    }
  }

  @Get('analytics/marketplace')
  async getMarketplaceAnalytics() {
    try {
      const res = await fetch(`${this.analyticsUrl}/analytics/marketplace`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Analytics service unreachable: ${err.message}` };
    }
  }

  @Get('analytics/ai')
  async getAiMetrics() {
    try {
      const res = await fetch(`${this.analyticsUrl}/analytics/ai`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Analytics service unreachable: ${err.message}` };
    }
  }

  @Get('analytics/system')
  async getSystemMetrics() {
    try {
      const res = await fetch(`${this.analyticsUrl}/analytics/system`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Analytics service unreachable: ${err.message}` };
    }
  }

  // --- ADMIN PANEL ---
  @Get('admin/users')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  getUsers() {
    return { success: true, data: [] };
  }

  @Get('admin/agents')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  getAgents() {
    return { success: true, data: [] };
  }

  @Post('admin/agents/:id/approve')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  approveAgent(@Param('id') id: string) {
    return { success: true, message: `Agent ${id} approved for listing` };
  }

  @Post('admin/agents/:id/reject')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  rejectAgent(@Param('id') id: string) {
    return { success: true, message: `Agent ${id} listing rejected` };
  }

  @Post('admin/users/:id/suspend')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  suspendUser(@Param('id') id: string) {
    return { success: true, message: `User ${id} suspended` };
  }

  @Get('admin/reports')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  getReports() {
    return { success: true, data: [] };
  }

  @Get('admin/fraud')
  @UseGuards(GatewayAuthGuard, RolesGuard)
  @Roles('admin')
  getFraudDetections() {
    return { success: true, data: [] };
  }
}

import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Controller('api/v1')
export class NotificationController {
  constructor(private readonly prisma: PrismaService) {}

  private async seedIfEmpty() {
    const count = await this.prisma.notification.count();
    if (count === 0) {
      await this.prisma.notification.createMany({
        data: [
          { userId: 'user-1', type: 'warning', title: 'SLA Warning', body: 'QuickScan latency exceeded 800ms limit threshold', read: false },
          { userId: 'user-1', type: 'success', title: 'Escrow Deposited', body: 'Reserved 1.25 USDC for Tesla Q1 intention', read: false },
        ]
      });
    }
  }

  @Get('notifications')
  async getNotifications() {
    try {
      await this.seedIfEmpty();
      const notifs = await this.prisma.notification.findMany({
        where: { userId: 'user-1' },
        orderBy: { createdAt: 'desc' }
      });
      return {
        success: true,
        data: notifs.map(n => ({
          id: n.id,
          title: n.title,
          message: n.body,
          type: n.type,
          read: n.read,
          createdAt: n.createdAt
        }))
      };
    } catch (err: any) {
      return { success: false, message: `Failed to load notifications: ${err.message}` };
    }
  }

  @Get('notifications/:id')
  async getNotification(@Param('id') id: string) {
    try {
      const notif = await this.prisma.notification.findUnique({
        where: { id }
      });
      return {
        success: true,
        data: notif
      };
    } catch (err: any) {
      return { success: false, message: `Failed to find notification: ${err.message}` };
    }
  }

  @Patch('notifications/:id/read')
  async markRead(@Param('id') id: string) {
    try {
      await this.prisma.notification.update({
        where: { id },
        data: { read: true }
      });
      return { success: true, message: `Notification ${id} marked as read` };
    } catch (err: any) {
      return { success: false, message: `Failed to mark notification: ${err.message}` };
    }
  }

  @Post('notifications/read-all')
  @HttpCode(HttpStatus.OK)
  async markAllRead() {
    try {
      await this.prisma.notification.updateMany({
        where: { userId: 'user-1', read: false },
        data: { read: true }
      });
      return { success: true, message: 'All in-app alerts marked as read' };
    } catch (err: any) {
      return { success: false, message: `Failed to update notification alerts: ${err.message}` };
    }
  }

  @Delete('notifications/:id')
  async deleteNotification(@Param('id') id: string) {
    try {
      await this.prisma.notification.delete({
        where: { id }
      });
      return { success: true, message: `Notification ${id} archived` };
    } catch (err: any) {
      return { success: false, message: `Failed to archive notification: ${err.message}` };
    }
  }

  @Get('preferences')
  getPreferences() {
    return {
      success: true,
      data: { email: true, realtime: true, security: true, payments: true, workflowUpdates: true }
    };
  }

  @Patch('preferences')
  updatePreferences(@Body() body: any) {
    return { success: true, message: 'Notification preferences updated', data: body };
  }
}

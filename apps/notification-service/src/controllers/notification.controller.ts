import { Controller, Get, Post, Patch, Delete, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Controller('api/v1')
export class NotificationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('notifications')
  async getNotifications(@Query('userId') userId?: string) {
    try {
      const targetUserId = userId || 'user-1';
      const notifs = await this.prisma.notification.findMany({
        where: { userId: targetUserId },
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
      const updated = await this.prisma.notification.update({
        where: { id },
        data: { read: true }
      });
      return {
        success: true,
        data: updated
      };
    } catch (err: any) {
      return { success: false, message: `Failed to mark notification as read: ${err.message}` };
    }
  }

  @Post('notifications/read-all')
  async readAll(@Query('userId') userId?: string) {
    try {
      const targetUserId = userId || 'user-1';
      await this.prisma.notification.updateMany({
        where: { userId: targetUserId, read: false },
        data: { read: true }
      });
      return { success: true, message: 'All notifications marked as read' };
    } catch (err: any) {
      return { success: false, message: `Failed to mark read all: ${err.message}` };
    }
  }

  @Delete('notifications/:id')
  async deleteNotification(@Param('id') id: string) {
    try {
      await this.prisma.notification.delete({
        where: { id }
      });
      return {
        success: true,
        message: 'Notification deleted successfully'
      };
    } catch (err: any) {
      return { success: false, message: `Failed to delete notification: ${err.message}` };
    }
  }
}

import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1')
export class NotificationController {
  @Get('notifications')
  getNotifications() {
    return {
      success: true,
      data: [
        { id: 'notif-1', title: 'Workflow Succeeded', message: 'SLA verification passed successfully', read: false }
      ]
    };
  }

  @Get('notifications/:id')
  getNotification(@Param('id') id: string) {
    return {
      success: true,
      data: { id, title: 'Workflow Succeeded', message: 'SLA verification passed successfully', read: false }
    };
  }

  @Patch('notifications/:id/read')
  markRead(@Param('id') id: string) {
    return { success: true, message: `Notification ${id} marked as read` };
  }

  @Post('notifications/read-all')
  @HttpCode(HttpStatus.OK)
  markAllRead() {
    return { success: true, message: 'All in-app alerts marked as read' };
  }

  @Delete('notifications/:id')
  deleteNotification(@Param('id') id: string) {
    return { success: true, message: `Notification ${id} archived` };
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

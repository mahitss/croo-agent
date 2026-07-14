import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';

@WebSocketGateway({ namespace: '/ws', cors: true })
export class NexusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private redisSub: Redis;

  private hasWarnedRedis = false;

  constructor() {
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    console.log(`[WEBSOCKET_GATEWAY] Connecting to Redis subscription on URL: ${redisUrl}`);
    
    this.redisSub = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      retryStrategy: (times) => {
        if (times > 3) {
          if (!this.hasWarnedRedis) {
            this.hasWarnedRedis = true;
            console.warn('[WEBSOCKET_GATEWAY] Local Redis connection failed repeatedly. Running with event streaming disabled.');
          }
          return null; // Stop reconnecting to prevent log spam
        }
        return Math.min(times * 100, 1000);
      },
    });

    this.redisSub.on('connect', () => {
      console.log('[WEBSOCKET_GATEWAY] Connected to Redis event broker successfully.');
      this.subscribeToChannels();
    });

    this.redisSub.on('error', (err) => {
      if (!this.hasWarnedRedis) {
        console.warn(`[WEBSOCKET_GATEWAY] Redis broker unavailable: ${err.message}`);
      }
    });
  }

  private subscribeToChannels() {
    this.redisSub.subscribe('workflow:logs', 'workflow:updates', (err, count) => {
      if (err) {
        console.error('[WEBSOCKET_GATEWAY] Failed to subscribe to Pub/Sub channels:', err);
      } else {
        console.log(`[WEBSOCKET_GATEWAY] Subscribed to ${count} Redis Pub/Sub channels.`);
      }
    });

    this.redisSub.on('message', (channel, message) => {
      try {
        const payload = JSON.parse(message);
        // Map channel to Socket.io event name
        if (channel === 'workflow:logs') {
          this.server.emit('workflow_log', payload);
        } else if (channel === 'workflow:updates') {
          this.server.emit('workflow_update', payload);
        }
      } catch (err) {
        console.error(`[WEBSOCKET_GATEWAY] Error parsing Redis channel message:`, err);
      }
    });
  }

  handleConnection(client: Socket) {
    console.log(`WebSocket client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`WebSocket client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket, data: any) {
    client.emit('pong', { success: true, message: 'pong' });
  }

  broadcastEvent(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}

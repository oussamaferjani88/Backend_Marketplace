import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket } from 'socket.io';
import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
//import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

@Controller()
@WebSocketGateway()
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  private server: Server;

  public afterInit(): void {
    //Init
  }

  public handleConnection(client: Socket): void {
    //Handle client connect
    console.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    //handle disconnect
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_messages')
  async handle_send_message(client: Socket, data : { message: MessageDto, expediteurId: number, recepteurId: number }) { 
    try {
      const res = await this.messageService.send_message(data.message, data.expediteurId, data.recepteurId);
      this.server.emit('message', data.message);
      client.emit('message_sent', { success: true });
      return res;
    } catch (err) {
      client.emit('message_sent', { success: false });
      console.error('message_send_error :', err);
    }
  }

  @SubscribeMessage('get_messages')
  async handle_get_messages(client: Socket, data : { expediteurId: number, recepteurId: number }) { 
    try {
      const messages = await this.messageService.get_messages(data.expediteurId, data.recepteurId);
      this.server.emit('messages', messages);
      return messages;
    } catch (err) {
      console.error(err);
      client.emit('get_messages_error', { success: false });
    }
  }

  @SubscribeMessage('mark_Read')
  async handle_mark_Read(client: Socket, data : { expediteurId: number, recepteurId: number }) {
    try {
      await this.messageService.mark_Read(data.expediteurId, data.recepteurId);
      client.emit('message_marked_read', { success: true });
      this.server.emit('message_marked_read', { success: true });
    } catch (err) {
      console.error(err);
      client.emit('message_marked_read', { success: false });
      console.log('mark_read_error :', err);
    }
  }

  @SubscribeMessage('remove_message')
  async remove_message(data : { id: number }) {
    try {
      await this.messageService.remove_message(data.id);
      this.server.emit('remove_message', 'Message removed');
    } catch (err) {
      console.error(err);
      this.server.emit('error', 'Failed to remove message');
    }       
  }
}
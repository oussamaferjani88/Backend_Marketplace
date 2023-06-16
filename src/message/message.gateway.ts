import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket } from 'socket.io';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';


@WebSocketGateway(8001,{cors :'*'})
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

  @SubscribeMessage('send_message')
  async handle_send_message(client: Socket, data : { message: MessageDto}) : Promise<Message> { 
    try {
      const message = await this.messageService.send_message(data.message, data.message.expediteur_id, data.message.recepteur_id);
      //console.log("message :",data.message);
      client.emit('message', data.message);
      client.emit('message_sent', { success: true });
      return message;
    } catch (err) {
      client.emit('message_sent', { success: false });
      console.error('message_send_error :', err);
    }
  }

  @SubscribeMessage('get_messages')
  async handle_get_messages(client: Socket, data : { expediteur: number, recepteur: number }) : Promise<Message[]> { 
    //console.log(`Data = ${JSON.stringify(data)}`);
    try {
      const messages = await this.messageService.get_messages(data.expediteur, data.recepteur);
      //console.log(`messages = ${JSON.stringify(messages)}`);
      client.emit('messages', messages);
      return messages;
    } catch (err) {
      console.error(err);
      client.emit('get_messages_error', { success: false });
    }
  }

  @SubscribeMessage('get_discussions') 
  async handle_get_discussions (client: Socket, data : { user_id: number }) {
    try {
      const discussions = await this.messageService.getUserDiscussions(data.user_id);
      console.log(`discussions = ${JSON.stringify(discussions)}`);
      client.emit('discussions', discussions);
    } catch (err) {
      console.error(err);
      client.emit('get_discussions_error', { success: false });
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
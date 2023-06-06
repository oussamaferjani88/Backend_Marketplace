/*import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';


@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  createMsg(
    @Body() message: MessageDto,
    @Body('expediteurId') expediteurId: number,
    @Body('recepteurId') recepteurId: number,
  ): Promise<Message> {
    return this.messageService.createMsg(message,expediteurId,recepteurId);
  }

  @Get(':expediteur_id/:recepteur_id')
  findMsgs(
    @Param('expediteur_id') expediteurId: number,
    @Param('recepteur_id') recepteurId: number,
  ): Promise<Message[]> {
    return this.messageService.findMsgs(expediteurId,recepteurId);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':msg_id')
  findOneId(@Param('msg_id') id: string): Promise<Message> {
    return this.messageService.findOneId(+id);
  }

  @Put(':expediteur_id/:recepteur_id')
  async markRead(
    @Param('expediteur_id') expediteurId: number,
    @Param('recepteur_id') recepteurId: number,
  ): Promise<void> {
    await this.messageService.markRead(expediteurId, recepteurId);
  }

  @Put(':msg_id')
  update(
    @Param('msg_id') id: string,
    @Body() message: MessageDto,
  ): Promise<Message> {
    return this.messageService.update(+id, message);
  }

  @Delete(':msg_id')
  remove(@Param('msg_id') id: string): Promise<void> {
    return this.messageService.remove(+id);
  }
}*/

import { Controller, Post, Req, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMsg(@Body() req) {
    console.log(req);
    return this.mailService.sendMsg(req.dest, req.sub, req.msg);
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMsg(dest: string, sub: string, msg: string) {
    await this.mailerService.sendMail({
      to: dest,
      subject: sub,
      html: msg,
    });
  }
}

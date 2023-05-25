import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { sender } from './coordonnees';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: sender.email,
          pass: sender.password,
        },
      },
      defaults: {
        from: `"Shopzilla" <${sender.email}>`,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

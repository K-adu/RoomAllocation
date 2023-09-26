import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'yanjish.hellscream@gmail.com',
        pass: 'beutpkcwmduznqmk',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'yanjish.hellscream@gmail.com',
      to,
      subject,
      text,
    };
    console.log(mailOptions);
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new NotAcceptableException('Not acceptable');
    }
  }
}

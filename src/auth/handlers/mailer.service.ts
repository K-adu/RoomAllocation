// mailer.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // first ma transporter banaune
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

    try {
      console.log(mailOptions);
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
}

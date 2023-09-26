// mailer.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // First, create a transporter
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
    await this.transporter.sendMail(mailOptions);
  }
}

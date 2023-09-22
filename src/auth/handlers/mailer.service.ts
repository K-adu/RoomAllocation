// mailer.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a transporter for sending emails
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Your email service provider (e.g., Gmail)
      auth: {
        user: 'yanjish.hellscream@gmail.com', // Your email address
        pass: 'beutpkcwmduznqmk', // Your email password or app-specific password
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

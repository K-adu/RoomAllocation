import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Messages from 'src/common/language/responseMessage';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAILING_EMAIL,
        pass: process.env.MAILING_APPWISE_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.MAILING_EMAIL,
      to,
      subject,
      text,
    };
    console.log(mailOptions);
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new NotAcceptableException(Messages.EMAIL_SENDING_FAILED);
    }
  }
}

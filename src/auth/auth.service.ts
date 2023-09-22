import { Injectable } from '@nestjs/common';
import { OtpService } from './handlers/otp.service';
import { MailerService } from './handlers/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailerService: MailerService,
  ) {}

  async generateOtpAndSendService(email) {
    //  otp generate garne
    try {
      const otp = await this.otpService.generateOTP(email);
      const subject = 'EB App OTP verification';
      const text = `Your OTP code is: ${otp}`;
      // otp send garne tyo email ma

      //nodemailer use  garne
      await this.mailerService.sendEmail(email, subject, text);
    } catch (e) {
      console.log('error from generation and sending', e);
    }
  }
  async verifyOtpService(email, otp) {
    try {
      const value = await this.otpService.verifyOTP(email, otp);
      console.log('Otp verificaion success', value);

      // if the step succeeds then save the value to the database of the user
    } catch (e) {
      console.log('otp verification failed', e);
    }
  }
}

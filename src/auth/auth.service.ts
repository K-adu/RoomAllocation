import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpService } from './handlers/otp.service';
import { MailerService } from './handlers/mailer.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailerService: MailerService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateOtpAndSendService(email) {
    //  otp generate garne
    try {
      const otp = this.otpService.generateOTP(email);
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
      if (!value) {
        throw new UnauthorizedException('OTP verification failed');
      }
      console.log('Otp verificaion success', value);

      const user = await this.userService.checkUserExistService(email);
      if (!user) {
        const data = {
          email,
        };

        await this.userService.addUserToDbService(data);
      }
      console.log('this is from the auth service', user);

      const payload = {
        id: user._id,
        email: user.email,
      };
      const jwt = await this.jwtService.signAsync(payload);
      console.log(jwt);
    } catch (e) {
      console.log('otp verification failed', e);
    }
  }
}

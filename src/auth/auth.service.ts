import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { OtpService } from './handlers/otp.service';
import { MailerService } from './handlers/mailer.service';
import { UserService } from '../user/user.service';
import { GenerateJwtService } from './handlers/jwt.service';
import Messages from 'src/common/language/responseMessage';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailerService: MailerService,
    private userService: UserService,
    private generateJwtService: GenerateJwtService,
  ) {}

  async generateOtpService(email: string) {
    try {
      const otp = this.otpService.generateOTP(email);
      const subject = 'EB App OTP verification';
      //const text = `Your OTP code is: ${otp}, Please do not share the OTP with anyone.`;
      const text = Messages.SENDING_OTP_EMAIL_TEXT.replace(
        '[Insert OTP Code]',
        otp,
      );

      const mail = await this.mailerService.sendEmail(email, subject, text);
      return mail;
    } catch (e) {
      throw new NotAcceptableException('The provided email is not acceptable');
    }
  }

  async verifyOtpService(email: string, otp: string) {
    try {
      const value = await this.otpService.verifyOTP(email, otp);
      if (!value) {
        throw new UnauthorizedException('OTP verification failed');
      }
      console.log('Otp verification success', value);

      const user = await this.userService.checkUserExistService(email);
      if (!user) {
        const data = {
          email: email,
        };
        const newUser = await this.userService.addUserToDbService(data);
        return await this.generateJwtService.generateJwt(newUser);
      } else {
        return await this.generateJwtService.generateJwt(user);
      }
    } catch (e) {
      console.log('otp verification failed', e);
    }
  }
}

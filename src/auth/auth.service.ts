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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailerService: MailerService,
    private userService: UserService,
    private generateJwtService: GenerateJwtService,
    private jwtService: JwtService,
  ) {}

  async generateOtpService(email: string) {
    try {
      const otp = this.otpService.generateOTP(email);
      const subject = Messages.SENDING_OTP_EMAIL_SUBJECT;
      //const text = `Your OTP code is: ${otp}, Please do not share the OTP with anyone.`;
      const text = Messages.SENDING_OTP_EMAIL_TEXT.replace(
        '[Insert OTP Code]',
        otp,
      );

      const mail = await this.mailerService.sendEmail(email, subject, text);
      return mail;
    } catch (e) {
      throw new NotAcceptableException(Messages.EMAIL_SENDING_FAILED);
    }
  }

  async verifyOtpService(email: string, otp: string) {
    try {
      const value = await this.otpService.verifyOTP(email, otp);
      if (!value) {
        throw new UnauthorizedException(Messages.OTP_VERIFICATION_FAILED);
      }

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
      throw new UnauthorizedException(Messages.OTP_VERIFICATION_FAILED);
    }
  }
  async verifyRefreshToken(refreshToken) {
    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = decodedRefreshToken;
      const newAccessToken = await this.generateJwtService.generateJwt(user);
    return newAccessToken.accessToken;
    } catch (e) {
      throw new UnauthorizedException('invalid or expired refresh token');
    }
  }
}

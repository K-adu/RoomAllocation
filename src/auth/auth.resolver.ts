import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.schema';
import { OtpDto, OtpMail } from './dto/otp.dto';
import { NotAcceptableException } from '@nestjs/common';
import { Token } from './dto/token.dto';
import Messages from '../common/language/responseMessage';
@Resolver((of) => 'Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
  // this is a dummyt query just cause to have mutation we should have one query
  @Query(() => User)
  async tryQuery() {
    return {
      username: 'manish',
      email: 'this is working too',
      password: ' nothing',
    };
  }

  @Mutation(() => OtpMail)
  async sendEmail(@Args('sendEmail') data: LoginDto) {
    try {
      const global = await this.authService.generateOtpService(data.email);
      console.log(Messages.SENDING_OTP_EMAIL_TEXT);
      return { otpBool: true };
    } catch (e) {
      throw new NotAcceptableException(Messages.OTP_VERIFICATION_FAILED);
    }
  }

  @Mutation(() => Token)
  async sendOtp(@Args('sendOtp') data: OtpDto) {
    try {
      const token = await this.authService.verifyOtpService(
        data.email,
        data.otp,
      );
      return { token };
    } catch (e) {
      throw new NotAcceptableException('not accaptable');
    }
  }
}

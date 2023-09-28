import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.schema';
import { OtpDto, OtpMail } from './dto/otp.dto';
import { NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { NewAccessToken, Token } from './dto/token.dto';
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
      throw new NotAcceptableException(Messages.EMAIL_SENDING_FAILED);
    }
  }

  @Mutation(() => Token)
  async sendOtp(@Args('sendOtp') data: OtpDto) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.verifyOtpService(data.email, data.otp);
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new NotAcceptableException(Messages.OTP_VERIFICATION_FAILED);
    }
  }

  @Mutation(() => NewAccessToken)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    try {
      // Verify the refresh token
      const tokens = await this.authService.verifyRefreshToken(refreshToken);
      return tokens;
    } catch (e) {
      throw new UnauthorizedException(
        'the refresh token verificaiton failed  ',
      );
    }
  }
}

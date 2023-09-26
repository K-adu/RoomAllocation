import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.schema';
import { OtpDto, OtpMail } from './dto/otp.dto';
import { NotAcceptableException } from '@nestjs/common';
import { Token } from './dto/token.dto';

@Resolver((of) => 'User')
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
  async sendEmail(@Args('generateOtp') data: LoginDto) {
    try {
      const global = await this.authService.generateOtpService(data.email);
      console.log(global);
      return { otpBool: true };
    } catch (e) {
      throw new NotAcceptableException('Not acceptable');
    }
  }

  @Mutation(() => Token)
  async sendOtp(@Args('generateOpt') data: OtpDto) {
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

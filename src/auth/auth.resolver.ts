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

  @Query(() => User)
  async tryQuery() {
    return {
      username: 'manish',
      email: 'this is working too',
      password: ' nothing',
    };
  }

  @Mutation(() => OtpMail)
  async generateOtpResolver(@Args('generateOpt') data: LoginDto) {
    try {
      await this.authService.generateOtpAndSendService(data.email);
      return true;
    } catch (e) {
      throw new NotAcceptableException('not accaptable');
    }
  }

  @Mutation(() => Token)
  async verifyOtpResolver(@Args('generateOpt') data: OtpDto) {
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

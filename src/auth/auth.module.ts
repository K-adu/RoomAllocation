import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpService } from './handlers/otp.service';
import { MailerService } from './handlers/mailer.service';
import { UserModule } from 'src/user/user.module';
import { GenerateJwtService } from './handlers/jwt.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    OtpService,
    MailerService,
    GenerateJwtService,
    AuthResolver,
  ],
})
export class AuthModule {}

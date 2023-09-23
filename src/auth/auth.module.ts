import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from './handlers/otp.service';
import { MailerService } from './handlers/mailer.service';
import { UserModule } from 'src/user/user.module';
import { GenerateJwtService } from './handlers/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, OtpService, MailerService, GenerateJwtService],
})
export class AuthModule {}

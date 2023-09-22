import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from './handlers/otp.service';
import { MailerService } from './handlers/mailer.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OtpService, MailerService],
})
export class AuthModule {}

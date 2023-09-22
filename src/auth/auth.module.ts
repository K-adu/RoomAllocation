import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from './handlers/otp.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OtpService],
})
export class AuthModule {}

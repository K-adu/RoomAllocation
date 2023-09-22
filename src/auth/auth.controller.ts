import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async generateOtpController(@Body() body: any) {
    try {
      await this.authService.generateOtpAndSendService(body.email);
    } catch (e) {}
  }

  @Post('/otp')
  async verifyOtpContoller(@Body() body: any) {
    await this.authService.verifyOtpService(body.email, body.otp);
  }
}

import { Injectable } from '@nestjs/common';
import { OtpService } from './handlers/otp.service';

@Injectable()
export class AuthService {
  constructor(private otpService: OtpService) {}

  async generateOtpAndSendService(email) {
    //  otp generate garne
    const otp = await this.otpService.generateOTP(email);
    console.log(otp);

    // otp send garne tyo email ma

    //ani tespachi
  }
  async verifyOtpService(email, otp) {
    try {
      const value = await this.otpService.verifyOTP(email, otp);
      console.log('Otp verificaion success', value);

      // if the step succeeds then save the value to the database of the user
    } catch (e) {
      console.log('otp verification failed', e);
    }
  }
}

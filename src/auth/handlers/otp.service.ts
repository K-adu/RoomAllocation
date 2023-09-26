import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
  generateOTP(secret: string): string {
    const otp = speakeasy.totp({
      secret,
      encoding: 'base32',
      digits: 5,
      time: 120,
    });
    return otp;
  }

  verifyOTP(secret: string, otp: string): boolean {
    const isValidOTP = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: otp,
      digits: 5,
      time: 120,
    });
    return isValidOTP;
  }
}

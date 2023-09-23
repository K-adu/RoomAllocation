// auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateJwtService {
  constructor(private jwtService: JwtService) {}

  async genetateJwt(user) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    console.log('this is from the auth service', user);

    const jwt = await this.jwtService.signAsync(payload);
    console.log(jwt);
  }
}

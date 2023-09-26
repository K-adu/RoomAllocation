// jwt.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateJwtService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: any) {
    // Assuming user is of type 'any'
    const payload = {
      id: user._id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload);
  }
}

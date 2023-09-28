import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateJwtService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: any) {
    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}

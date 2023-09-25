import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload; // Set user directly on the request object
      return true;
    } catch (err) {
      console.error(err); // Use console.error for errors
      throw new UnauthorizedException();
    }
  }

  // private extractTokenFromCookies(request): string | null {
  //   const cookies = request.cookies;
  //   const token = cookies['access_token']; // Replace with the actual cookie name
  //   return token || null;
  // }
  private extractTokenFromHeaders(request): string | null {
    const authorizationHeader = request.headers['authorization'];

    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');

      // Check if the Authorization header has a Bearer token
      if (bearer === 'Bearer' && token) {
        return token;
      }
    }

    return null;
  }
}

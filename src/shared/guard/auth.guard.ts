import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = this.extractTokenFromHeaders(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attach the user to the request object
      req.user = payload;
      console.log(req.user);
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeaders(request): string | null {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer === 'Bearer' && token) {
        return token;
      }
    }

    return null;
  }
}

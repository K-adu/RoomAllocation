import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'; // Import GqlExecutionContext
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context); // Create a GraphQL execution context
    const { req } = ctx.getContext(); // Get the GraphQL context's request object

    const token = this.extractTokenFromHeaders(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req.user = payload; // Set user directly on the request object
      return true;
    } catch (err) {
      console.error(err); // Use console.error for errors
      throw new UnauthorizedException();
    }
  }

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

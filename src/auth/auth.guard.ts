import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/roles/roles.decorator';
import { FastifyRequest } from 'fastify';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  private checkUserIdAuthorized(user: User, request: FastifyRequest) {
    if (request.params['user_id']) {
      const id = Number(request.params['user_id']);
      if (user.role === 'USER' && user.id !== id) {
        throw new Error();
      }
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user: User = decoded;
      this.checkUserIdAuthorized(user, request);
      request['user'] = user;
      return !roles || roles.some((role) => user.role === role);
    } catch (_) {
      return false;
    }
  }
}

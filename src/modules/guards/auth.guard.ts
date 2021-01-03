import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';

interface ParsedToken {
  uid: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const parsedToken = await this.validateToken(ctx.headers.authorization);
    const user = await this.userService.findOne(parsedToken.uid);
    ctx.user = user;
    return true;
  }

  validateToken(auth: string): ParsedToken {
    if (!auth) {
      throw new AuthenticationError('Unauthenticated');
    }
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new AuthenticationError('Unauthenticated');
    }
    const token = auth.split(' ')[1];
    try {
      const parsed = jwt.verify(token, process.env.APP_SECRET) as ParsedToken;
      return parsed;
    } catch (error) {
      throw new AuthenticationError('Unauthenticated');
    }
  }
}

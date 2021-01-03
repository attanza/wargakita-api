import { Injectable } from '@nestjs/common';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { compare, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { LoginInput, RegisterInput } from './auth.dto';
import { ILogin } from './auth.interface';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(input: RegisterInput): Promise<User> {
    if (await this.userService.checkExists('email', input.email)) {
      throw new UserInputError('Email already exists');
    }
    const userData: Partial<User> = {
      ...input,
      password: await hash(input.password, 10),
    };
    const user = await this.userService.create<User>(userData);
    return user;
  }

  async login(input: LoginInput): Promise<ILogin> {
    const user = await this.userService.findBy<User>('email', input.email);
    if (!user) {
      throw new AuthenticationError('Login Failed');
    }
    const compared = await compare(input.password, user.password);
    if (!compared) {
      throw new AuthenticationError('Login Failed');
    }

    const token = await this.generateToken(user.id);
    const refreshToken = await this.generateToken(user.id, '7w');
    return { token, refreshToken };
  }

  async generateToken(uid: string, exp = '1h'): Promise<string> {
    return jwt.sign(
      {
        uid,
      },
      process.env.APP_SECRET,
      { expiresIn: exp },
    );
  }
}

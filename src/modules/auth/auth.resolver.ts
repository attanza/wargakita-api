import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../user/user.schema';
import { LoginInput, RegisterInput } from './auth.dto';
import { ILogin } from './auth.interface';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  me(@Context('user') user: User): User {
    return user;
  }

  @Mutation(() => User)
  async register(
    @Args('input', new ValidationPipe()) input: RegisterInput,
  ): Promise<User> {
    return this.service.register(input);
  }
  @Mutation(() => ILogin)
  async login(
    @Args('input', new ValidationPipe()) input: LoginInput,
  ): Promise<ILogin> {
    return this.service.login(input);
  }
}

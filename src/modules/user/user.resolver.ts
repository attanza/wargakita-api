import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.service.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Mutation(() => User)
  async userCreate(
    @Args('input', new ValidationPipe()) input: CreateUser,
  ): Promise<User> {
    if (this.service.checkExists('email', input.email)) {
      throw new UserInputError('Email already exists');
    }
    return this.service.create(input);
  }

  @Mutation(() => User)
  async userUpdate(
    @Args('input', new ValidationPipe()) input: UpdateUser,
  ): Promise<User> {
    return this.service.update(input);
  }

  @Mutation(() => Boolean)
  async userDelete(@Args('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}

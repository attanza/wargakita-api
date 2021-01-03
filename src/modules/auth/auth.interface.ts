import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ILogin {
  @Field()
  token: string;
  @Field()
  refreshToken: string;
}

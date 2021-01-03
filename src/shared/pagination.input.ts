import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  page?: number;
}

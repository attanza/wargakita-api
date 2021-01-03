import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'class-transformer/ClassTransformer';

export default function PaginatedResponse<TItem>(
  TItemClass: ClassType<TItem>,
): any {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    totalPage: number;

    @Field(() => Int, { nullable: true })
    nextPage: number;

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPrevPage: boolean;
  }
  return PaginatedResponseClass;
}

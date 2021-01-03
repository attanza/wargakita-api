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

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPrevPage: boolean;
  }
  return PaginatedResponseClass;
}

// totalDocs: number | undefined;
// limit: number | undefined = 0;
// totalPages: number | undefined;
// page: number | undefined;
// pagingCounter: number | undefined;
// hasPrevPage: Boolean | undefined = false;
// hasNextPage: Boolean | undefined = false;
// prevPage: number | undefined;
// nextPage: number | undefined;
// hasMore: Boolean | undefined = false;
// docs: any[] = [];

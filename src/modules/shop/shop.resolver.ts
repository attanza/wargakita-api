import { ValidationPipe } from '@nestjs/common';
import {
  Args,
  Info,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
import PaginatedResponse from 'src/shared/paginatedResponse';
import { PaginationInput } from 'src/shared/pagination.input';
import { CreateShop } from './dto/create-shop.dto';
import { UpdateShop } from './dto/update-shop.dto';
import { Shop } from './shop.schema';
import { ShopService } from './shop.service';

@ObjectType()
export class PaginatedShopResponse extends PaginatedResponse(Shop) {}

@Resolver()
export class ShopResolver {
  constructor(private readonly service: ShopService) {}

  @Query(() => PaginatedShopResponse)
  async shopPaginate(
    @Args('queries', { nullable: true }) paginationInput: PaginationInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.service.paginate(paginationInput, info);
  }

  @Query(() => [Shop])
  async shops(): Promise<Shop[]> {
    return this.service.findAll();
  }

  @Query(() => Shop, { nullable: true })
  async shop(@Args('id') id: string): Promise<Shop> {
    return this.service.findOne(id);
  }

  @Mutation(() => Shop)
  async shopCreate(
    @Args('input', new ValidationPipe()) input: CreateShop,
  ): Promise<Shop> {
    if (await this.service.checkExists('name', input.name)) {
      throw new UserInputError('Name already exists');
    }
    let location = undefined;
    if (input.latitude && input.longitude) {
      location = {
        type: 'Point',
        coordinates: [input.latitude, input.longitude],
      };
    }
    const shopData: Partial<Shop> = {
      ...input,
      location,
    };
    return this.service.create(shopData);
  }

  @Mutation(() => Shop)
  async shopUpdate(
    @Args('input', new ValidationPipe()) input: UpdateShop,
  ): Promise<Shop> {
    const existing = await this.service.findBy<Shop>('name', input.name);
    if (existing && existing.id.toString() !== input.id.toString()) {
      throw new UserInputError('Name already exists');
    }
    let location = undefined;
    if (input.latitude && input.longitude) {
      location = {
        type: 'Point',
        coordinates: [input.latitude, input.longitude],
      };
    }
    console.log('location', location);
    const shopData: Partial<Shop> = {
      ...input,
      location,
    };
    return this.service.update(shopData);
  }

  @Mutation(() => Boolean)
  async shopDelete(@Args('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}

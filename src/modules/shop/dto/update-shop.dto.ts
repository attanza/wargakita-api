import { Field, InputType } from '@nestjs/graphql';
import {
  IsLatitude,
  IsLongitude,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

@InputType()
export class UpdateShop {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsLongitude()
  longitude?: number;
}

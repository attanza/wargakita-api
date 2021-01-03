import { Field, InputType } from '@nestjs/graphql';
import { IsLatitude, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateShop {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field({ nullable: true })
  @IsOptional()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsLatitude()
  latitude: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsLatitude()
  longitude: number;
}

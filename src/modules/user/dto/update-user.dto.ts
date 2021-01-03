import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateUser {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}

import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema()
@ObjectType()
class Location {
  @Prop({ default: 'Point' })
  @Field({ nullable: true })
  type?: string;

  @Prop()
  @Field(() => [Float], { nullable: true })
  coordinates?: number[];
}

@Schema({ timestamps: true })
@ObjectType()
export class Shop {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  id: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  category: string;

  @Prop()
  @Field({ nullable: true })
  address?: string;

  @Prop(() => Location)
  @Field({ nullable: true })
  location: Location;

  @Prop()
  @Field({ nullable: true })
  image?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

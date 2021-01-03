import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopResolver } from './shop.resolver';
import { Shop, ShopSchema } from './shop.schema';
import { ShopService } from './shop.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],

  providers: [ShopService, ShopResolver],
  exports: [ShopService],
})
export class ShopModule {}

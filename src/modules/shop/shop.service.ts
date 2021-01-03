import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDbService } from 'src/shared/base-db.service';
import { Shop, ShopDocument } from './shop.schema';

@Injectable()
export class ShopService extends BaseDbService {
  constructor(@InjectModel(Shop.name) private model: Model<ShopDocument>) {
    super(model);
  }
}

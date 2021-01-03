import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Shop } from './modules/shop/shop.schema';
import { ShopService } from './modules/shop/shop.service';
@Injectable()
export class SeederService {
  constructor(private readonly shopService: ShopService) {}

  async run(): Promise<void> {
    await this.shopService.deleteMany();
    const shops: Partial<Shop>[] = [];
    for (let i = 0; i < 50; i++) {
      shops.push({
        name: faker.company.companyName(),
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(faker.address.longitude()),
            parseFloat(faker.address.latitude()),
          ],
        },
        category: faker.vehicle.type(),
        address: faker.address.streetAddress(),
        image: faker.image.business(400, 300),
      });
    }
    await this.shopService.insertMany(shops);
  }
}

import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller()
export class AppController {
  constructor(private readonly seederService: SeederService) {}
  @Get('/seed')
  async seeder() {
    await this.seederService.run();
    return 'Database seeded!';
  }
}

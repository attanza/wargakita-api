import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { UserModule } from './modules/user/user.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI + process.env.DB_NAME),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UserModule,
    AuthModule,
    ShopModule,
  ],
  providers: [AppService, SeederService],
  controllers: [AppController],
})
export class AppModule {}

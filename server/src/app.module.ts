import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UrlManagerModule } from './url-manager/url-manager.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGOOSE_URL,
      }),
    }),
    UrlManagerModule
  ],
  controllers: [
  ],
  providers: [
  ]
})
export class AppModule {
}

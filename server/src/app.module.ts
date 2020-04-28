import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UrlManagerModule } from './url-manager/url-manager.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGOOSE_URL,
      }),
    }),
    UrlManagerModule,
    AuthModule
  ],
  controllers: [
  ],
  providers: [
  ]
})
export class AppModule {
}

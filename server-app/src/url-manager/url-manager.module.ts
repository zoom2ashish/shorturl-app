import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlItemSchema } from 'src/schemas/url-item.schema';
import { UrlItemsService } from 'src/services/url-items.services';

import { UrlManagerController } from './url-manager.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UrlItem', schema: UrlItemSchema }
    ])
  ],
  controllers: [
    UrlManagerController
  ],
  providers: [
    UrlItemsService
  ]
})
export class UrlManagerModule {}

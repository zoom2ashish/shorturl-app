import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlItemSchema } from 'src/schemas/url-item.schema';
import { UrlItemsService } from 'src/services/url-items.services';

import { UrlManagerController } from './url-manager.controller';
import { UrlRedirectionController } from './url-redirection.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UrlItem', schema: UrlItemSchema }
    ])
  ],
  controllers: [
    UrlManagerController,
    UrlRedirectionController
  ],
  providers: [
    UrlItemsService
  ]
})
export class UrlManagerModule {}

import { Controller, Get, Res, Next, Param } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UrlItemsService } from '../services/url-items.services';

@Controller()
export class UrlRedirectionController {
  constructor(private urlItemsService: UrlItemsService) {}

  @Get('/:hash')
  async handleRedirection(@Param('hash') hashcode: string, @Res() response: Response, @Next() next: NextFunction) {
    const urlItem = await this.urlItemsService.findByHash(hashcode);
    if (urlItem) {
      response.redirect(urlItem.url);
    } else {
      next();
    }

  }
}

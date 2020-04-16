import { Controller, MergeParams, Get, Required, PathParams, Status, Req, Res, Next, $log } from '@tsed/common';
import { UrlManagerService } from '../../services/url-manager.service';
import * as Express from 'express';
import { NotFound } from 'ts-httpexceptions';

@Controller('/')
@MergeParams()
export class UrlRedirectionController {
  constructor(private urlManager: UrlManagerService) {}

  @Get('/:hash')
  async handleRedirection(@Req() request: Express.Request, @Res() response: Express.Response, @Next() next: Express.NextFunction) {
    $log.info('request.params.id', request.params.hash);
    const shortenedUrl = await this.urlManager.findByHash(request.params.hash);
    if (!shortenedUrl) {
      throw new NotFound('Url not found');
    }
    response.redirect(shortenedUrl.url);

    next();
  }
}

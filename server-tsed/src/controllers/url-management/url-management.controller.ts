import { BodyParams, Controller, Get, PathParams, Post, Required, Status, $log, Delete, Scope, ProviderScope } from '@tsed/common';
import { CreateShortUrlPayload } from '../../models/url-management.model';
import { NotFound, BadRequest, InternalServerError } from 'ts-httpexceptions';

import { ShortenedUrl } from '../../models/shortened-url.model';
import { UrlManagerService } from '../../services/url-manager.service';
import { encodeUrl } from '../../utils/url-shortner.util';
import { Authenticate } from '@tsed/passport';

@Controller('/url-management')
export class UrlManagementController {

  constructor(private urlManager: UrlManagerService) {
  }

  @Get()
  @Authenticate('googleJwt')
  @Status(200, {type: ShortenedUrl, collectionType: Array})
  async getAll(): Promise<ShortenedUrl[]> {
    return this.urlManager.query();
  }

  @Get('/:hash')
  @Status(200, {type: ShortenedUrl})
  async get(@Required() @PathParams('hash') hascode: string): Promise<ShortenedUrl> {
    const shortenedUrl = await this.urlManager.findByHash(hascode);

    if (shortenedUrl) {
      return shortenedUrl;
    }

    throw new NotFound("Url not found");
  }


  @Post('/shorten')
  async createShortUrl(@BodyParams() payload: CreateShortUrlPayload): Promise<ShortenedUrl> {
    if (!payload || !payload.url) {
      throw new BadRequest('Invalid request. Url not provided.');
    }

    const existingShortenedUrl = await this.urlManager.findByUrl(payload.url);
    if (existingShortenedUrl) {
      return existingShortenedUrl;
    }

    const hashcode = encodeUrl(payload.url);
    const model = new ShortenedUrl();
    model.url = payload.url;
    model.hashcode = hashcode;
    model.created_at = (new Date()).getTime();
    model.created_by = 'admin';

    return this.urlManager.save(model)
      .catch((error) => {
        $log.error('Failed to store shortened', error);
        throw new InternalServerError('Failed to store url');
      });
  }

  @Delete('/:id')
  async deleteShortUrl(@PathParams('id') id: string): Promise<string> {
    if (!id) {
      throw (new BadRequest('Invalid "id" value'));
    }

    return this.urlManager.delete(id)
      .then(() => {
        return 'Url Deleted';
      }).catch(() => {
        $log.error('Failed to delete item');
        throw (new InternalServerError('Failed to delete item'));
      });
  }

}
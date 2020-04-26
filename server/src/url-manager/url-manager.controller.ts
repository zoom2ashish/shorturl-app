import { Controller, Get, Post, Body, Delete, Param, BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UrlItemsService } from 'src/services/url-items.services';
import { CreateUrlItemDto } from 'src/services/create-url-item.model';
import { encodeUrl } from '../utils/url-shortner.util';

@Controller('/api/v1/urls')
export class UrlManagerController {

  constructor(private readonly urlItemsService: UrlItemsService) {
  }

  @Get()
  async getAll() {
    const urlItems = await this.urlItemsService.query();
    console.log('urlItems=', urlItems);
    return urlItems;
  }

  @Get('/:hash')
  async get(@Param('hash') hashcode: string) {
    const urlItem = await this.urlItemsService.findByHash(hashcode);

    if (urlItem) {
      return urlItem;
    }

    throw new NotFoundException('Url not found');
  }

  @Post()
  async create(@Body() payload: CreateUrlItemDto) {
    if (!payload || !payload.url) {
      throw new BadRequestException('Invalid request. Url not provided.');
    }

    const existingShortenedUrl = await this.urlItemsService.findByUrl(payload.url);
    if (existingShortenedUrl) {
      return existingShortenedUrl;
    }

    const hashcode = encodeUrl(payload.url);
    const model: CreateUrlItemDto = {
      url: payload.url,
      hashcode: hashcode,
      createdAt: (new Date()).getTime(),
      createdBy: 'admin'

    };

    const urlItem = await this.urlItemsService.save(model)
      .catch((error) => {
        console.error('Failed to store shortened', error);
        throw new InternalServerErrorException('Failed to store url');
      });

    return urlItem;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Missing id value.');
    }
    return this.urlItemsService.delete(id)
    .then(() => {
      return 'Url Deleted';
    }).catch(() => {
      console.error('Failed to delete item');
      throw (new InternalServerErrorException('Failed to delete item'));
    });
  }
}

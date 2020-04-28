import { Controller, Get, Post, Body, Delete, Param, BadRequestException, Inject, InternalServerErrorException, NotFoundException, UseGuards, Scope, UnauthorizedException } from '@nestjs/common';
import { UrlItemsService } from 'src/services/url-items.services';
import { CreateUrlItemDto } from 'src/services/create-url-item.model';
import { encodeUrl } from '../utils/url-shortner.util';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils/user.decorator';

@Controller({
  path: '/api/v1/urls',
  scope: Scope.REQUEST
})
@UseGuards(AuthGuard('bearer'))
export class UrlManagerController {

  constructor(private readonly urlItemsService: UrlItemsService) {
  }

  @Get()
  async getAll(@User('email') email: string) {
    const urlItems = await this.urlItemsService.query(email);
    return urlItems;
  }

  @Get('/:id')
  async get(@Param('id') id: string, @User('email') email: string) {
    const urlItem = await this.urlItemsService.findById(email, id);

    if (urlItem) {
      return urlItem;
    }

    throw new NotFoundException('Url not found');
  }

  @Post()
  async create(@Body() payload: CreateUrlItemDto, @User('email') email: string) {
    if (!payload || !payload.url) {
      throw new BadRequestException('Invalid request. Url not provided.');
    }

    if (!email) {
      throw new UnauthorizedException();
    }

    const existingShortenedUrl = await this.urlItemsService.findByUrl(email, payload.url);
    if (existingShortenedUrl) {
      return existingShortenedUrl;
    }

    const hashcode = encodeUrl(payload.url);
    const model: CreateUrlItemDto = {
      url: payload.url,
      hashcode: hashcode,
      createdAt: (new Date()).getTime(),
      createdBy: email

    };

    const urlItem = await this.urlItemsService.save(email, model)
      .catch((error) => {
        console.error('Failed to store shortened', error);
        throw new InternalServerErrorException('Failed to store url');
      });

    return urlItem;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @User('email') email: string) {
    if (!id) {
      throw new BadRequestException('Missing id value.');
    }
    return this.urlItemsService.delete(email, id)
    .then(() => {
      return 'Url Deleted';
    }).catch(() => {
      console.error('Failed to delete item');
      throw (new InternalServerErrorException('Failed to delete item'));
    });
  }
}

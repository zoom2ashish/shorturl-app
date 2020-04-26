import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UrlItem } from "./url-item.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUrlItemDto } from "./create-url-item.model";

@Injectable()
export class UrlItemsService {

  constructor(@InjectModel('UrlItem')  private urlModel: Model<UrlItem>) {
  }

  async query(options = {}): Promise<UrlItem[]> {
    console.log('[UrlItemService::Query]');
    return this.urlModel.find(options).exec();
  }

  async findByHash(hashcode: string): Promise<UrlItem> {
    return this.urlModel.findOne({ hashcode });
  }

  async findByUrl(url: string): Promise<UrlItem> {
    return this.urlModel.findOne({ url });
  }

  async save(obj: CreateUrlItemDto): Promise<UrlItem> {
    console.debug('Save Event', obj);

    const doc = new this.urlModel(obj);
    return doc.save();
  }

  async delete(id: string): Promise<UrlItem> {
    console.debug(`Delete item ${id}`);
    return this.urlModel.findByIdAndRemove(id);
  }

}
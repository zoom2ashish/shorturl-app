import { Injectable, Scope, Inject, UseGuards, Optional, Get } from "@nestjs/common";
import { Model } from "mongoose";
import { UrlItem } from "./url-item.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUrlItemDto } from "./create-url-item.model";

@Injectable({
  scope: Scope.REQUEST
})
export class UrlItemsService {
  private _email: string;

  constructor(@InjectModel('UrlItem')  private urlModel: Model<UrlItem>) {
  }

  async query(email: string): Promise<UrlItem[]> {
    return this.urlModel.find({ createdBy: email }).exec();
  }

  async findById(email: string, id: string): Promise<UrlItem> {
    return this.urlModel.findOne({ createdBy: email, id });
  }

  async findByHash(hashcode: string): Promise<UrlItem> {
    return this.urlModel.findOne({ hashcode });
  }

  async findByUrl(email: string, url: string): Promise<UrlItem> {
    return this.urlModel.findOne({createdBy: email,  url });
  }

  async save(email: string, obj: CreateUrlItemDto): Promise<UrlItem> {
    if (!email) {
      return null;
    }

    const doc = new this.urlModel(obj);
    return doc.save();
  }

  async delete(email: string, id: string): Promise<UrlItem> {
    return this.urlModel.findOneAndRemove({ createdBy: email, id });
  }

}
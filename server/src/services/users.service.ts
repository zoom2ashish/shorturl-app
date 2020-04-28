import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User')  private userModel: Model<User>) {
  }

  async find(email: string) {
    return await this.userModel.findOne({ email });
  }

  async register(provider: string, email: string, name: string) {
    console.debug('Save User', { provider, email, name });

    const doc = new this.userModel({
      provider, email, name
    });
    return doc.save();
  }
}

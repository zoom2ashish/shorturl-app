import { Service, Inject, $log } from "@tsed/common";
import { ShortenedUrl } from "../models/shortened-url.model";
import { MongooseModel } from "@tsed/mongoose";

@Service()
export class UrlManagerService {

  constructor(@Inject(ShortenedUrl) private model: MongooseModel<ShortenedUrl>) {
    console.log(this.model);
  }

  async query(options = {}): Promise<ShortenedUrl[]> {
    return this.model.find(options).exec();
  }

  async findByHash(hashcode: string): Promise<ShortenedUrl> {
    return this.model.findOne({ hashcode });
  }

  async findByUrl(url: string): Promise<ShortenedUrl> {
    return this.model.findOne({ url });
  }

  async save(obj: ShortenedUrl): Promise<ShortenedUrl> {
    $log.debug('Save Event', obj);

    const doc = new this.model(obj);
    return doc.save();
  }

  async delete(id: string): Promise<ShortenedUrl> {
    $log.debug(`Delete item ${id}`);
    return this.model.findByIdAndRemove(id);
  }

}

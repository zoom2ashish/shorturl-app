import { Model, ObjectID, Unique } from '@tsed/mongoose';
import { Property, Required, PropertyName } from '@tsed/common';

@Model()
export class ShortenedUrl {
  @PropertyName("id")
  @Unique()
  @Required()
  _id: string;

  @Unique()
  @Required()
  url: string;

  @Unique()
  @Required()
  hashcode: string;

  @Property()
  created_at: number;

  @Property()
  created_by: string;
}

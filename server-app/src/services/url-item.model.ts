import { Document } from 'mongoose';

export interface UrlItem extends Document {
  readonly url: string;
  readonly hashcode: string;
  readonly createdAt: number;
  readonly createdBy: string;
}
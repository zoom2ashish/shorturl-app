import { Document } from 'mongoose';

export interface User extends Document {
  readonly provider: string;
  readonly email: string;
  readonly name: string;
}
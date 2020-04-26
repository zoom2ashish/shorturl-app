import * as mongoose from 'mongoose';

export const UrlItemSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  hashcode: { type: String, required: true, unique: true },
  createdAt: String,
  createdBy: String
});
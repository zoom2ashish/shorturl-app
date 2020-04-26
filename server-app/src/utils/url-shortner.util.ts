const Hashids = require("hashids/cjs");
const HASH_ALPHABETS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-";

export function encodeUrl(url: string): string {
    const hashids = new Hashids(url, 6, HASH_ALPHABETS);
    return hashids.encode([1, 2, 3, 4, 5, 6]);
  }

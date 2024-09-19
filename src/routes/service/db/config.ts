import type { NoSerialize } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { IDBPDatabase } from "idb";

export interface CachedImage {
  id: string;
  blob: Blob;
  hash: string;
}

export interface ImageCacheStore {
  value: NoSerialize<IDBPDatabase<CachedImage>> | null;
}

export const DB_NAME = "ImageCache";
export const STORE_NAME = "images";

export const imageCacheCTX = createContextId<ImageCacheStore>("ImageCacheCTX");

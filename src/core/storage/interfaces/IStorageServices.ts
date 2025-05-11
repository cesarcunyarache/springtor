
import { StorageResponse } from '../types/StorageTypes';

export interface IStorageService {
  uploadImage(file: string, folder?: string): Promise<StorageResponse>;
  deleteImage(publicId: string): Promise<void>;
}
  
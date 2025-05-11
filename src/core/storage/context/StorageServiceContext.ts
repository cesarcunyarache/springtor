import { IStorageService } from "../interfaces/IStorageServices";
import { CloudinaryStorageService } from "../services/CloudinaryStorageService";
import { StorageResponse } from "../types/StorageTypes";

export class StorageServiceContext {
  private storageService: IStorageService;

  constructor(provider: string = 'cloudinary') {
    if (provider === 'cloudinary') {
      this.storageService = new CloudinaryStorageService();
    } else {
      throw new Error('Proveedor de almacenamiento no soportado');
    }
  }

  public async uploadImage(file: string, folder?: string): Promise<StorageResponse> {
    return this.storageService.uploadImage(file, folder);
  }

  public async deleteImage(publicId: string): Promise<void> {
    return this.storageService.deleteImage(publicId);
  }
}

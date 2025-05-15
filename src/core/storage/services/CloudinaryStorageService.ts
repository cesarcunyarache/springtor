/* import { v2 as cloudinary } from "cloudinary";
import { IStorageService } from "../interfaces/IStorageServices";
import { StorageResponse } from "../types/StorageTypes";

export class CloudinaryStorageService implements IStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  public async uploadImage(
    file: string,
    folder?: string
  ): Promise<StorageResponse> {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: folder || "",
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch {
      return null;
    }
  }

  public async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
     
      throw error;
    }
  }
}
 */
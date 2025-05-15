/* "use server";

import { StorageResponse } from "../types/StorageTypes";
import { UploadApiResponse } from "cloudinary";

import { v2 as cloudinary } from "cloudinary";
import { EnumStorageFolder } from "../enums/enumStorageFolder";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export const uploadImageToCloudinary = async (file: File, folder: string): Promise<StorageResponse | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
          },
          function (error, result) {
            if (error || !result) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });


    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type
    };
  } catch {
   
    return null;
  }
};

export async function createUploadAction(
  
  payload: { image: File; folder: string }
): Promise<StorageResponse | null> {
  if (!payload.image || !(payload.image instanceof File)) {
   
    return null;
  }

  try {
    const arrayBuffer = await payload.image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: payload.folder,
          invalidate: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type
    };
  } catch  {
    return null;
  }
}


export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw error;
  }
}

export async function uploadProjectImages(files: File[]): Promise<StorageResponse[]> {

  const results = await Promise.all(
    files.map((file) => uploadImageToCloudinaryTwo(file, EnumStorageFolder.PROJECTS))
  );

  return results.filter(Boolean) as StorageResponse[];
}

export const uploadImageToCloudinaryTwo = async (file: File, folder: string): Promise<StorageResponse | null> => {
  try {
    const base64 = await fileToBase64(file);

    const result: UploadApiResponse = await cloudinary.uploader.upload(base64, {
      folder: folder,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
    };
  } catch  {

    return null;
  }
};


const fileToBase64 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const mimeType = file.type;
  return `data:${mimeType};base64,${base64}`;
};
 */
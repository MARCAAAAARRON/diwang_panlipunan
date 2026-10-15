import { v2 as cloudinary, type UploadApiResponse, type UploadApiOptions } from "cloudinary";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Checks whether all required Cloudinary environment variables are set
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Uploads a Buffer to Cloudinary with automatic optimization
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options?: UploadApiOptions
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadOptions: UploadApiOptions = {
      folder: "diwang-panlipunan/banners",
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" },
      ],
      ...options,
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed with empty response."));
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
}

export default cloudinary;

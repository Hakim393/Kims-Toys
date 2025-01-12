import { v2 as cloudinary } from "cloudinary";

// Validasi bahwa environment variable yang diperlukan sudah ada
const requiredEnvVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing.`);
  }
});

// Konfigurasi Cloudinary menggunakan environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export function untuk upload file
export const uploadToCloudinary = async (file, folder) => {
  try {
    const options = {
      folder: folder || "default-folder",
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
    };

    // Upload file ke cloudinary
    const result = await cloudinary.uploader.upload(file, options);

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload to Cloudinary.");
  }
};

export default cloudinary;

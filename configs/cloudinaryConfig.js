// Import the Cloudinary library
import { v2 as cloudinary } from "cloudinary";

// Validate that required environment variables are present
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

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export a function for uploading files
export const uploadToCloudinary = async (file, folder) => {
  try {
    const options = {
      folder: folder || "default-folder", // Optional folder to organize uploads
      resource_type: "auto", // Automatically detect the file type
      use_filename: true, // Use original file name
      unique_filename: false, // Avoid generating a random file name
    };

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file, options);

    return result; // Return Cloudinary response
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload to Cloudinary.");
  }
};

// Export the Cloudinary configuration for use elsewhere
export default cloudinary;

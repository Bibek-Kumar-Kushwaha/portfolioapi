// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Function to upload the image buffer to Cloudinary
const uploadImageOnCloud = async (fileBuffer, folderName, originalName) => {
    try {
        // Create a promise to handle the stream upload
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: folderName,
                    public_id: `Project_${originalName.split('.')[0]}`, // Use the original filename (without extension) for the public ID
                },
                (error, result) => {
                    if (error) {
                        reject(new Error('Cloudinary upload failed'));
                    } else {
                        resolve(result);
                    }
                }
            );

            // Pass the file buffer directly to Cloudinary
            uploadStream.end(fileBuffer);
        });
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error(error.message);
    }
};

export { uploadImageOnCloud };

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'n5yq0whs',
  api_key: process.env.CLOUDINARY_API_KEY || '976462431212786',
  api_secret: process.env.CLOUDINARY_API_SECRET || '9ACuu8IQKTacYF6G348broe8S-4',
  secure: true
});

export default cloudinary;


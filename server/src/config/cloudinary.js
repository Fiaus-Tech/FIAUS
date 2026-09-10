import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env from server/.env or root .env if exists
const envPaths = [path.resolve('server/.env'), path.resolve('.env')];
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  dotenv.config();
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'n5yq0whs',
  api_key: process.env.CLOUDINARY_API_KEY || '976462431212786',
  api_secret: process.env.CLOUDINARY_API_SECRET || '9ACuu8IQKTacYF6G348broe8S-4',
  secure: true
});

export default cloudinary;


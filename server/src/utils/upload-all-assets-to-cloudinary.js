import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import dns from 'dns';
import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';
import Project from '../models/Project.js';
import TeamMember from '../models/TeamMember.js';
import WebsiteSettings from '../models/WebsiteSettings.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../../');
const ASSETS_DIR = path.join(ROOT_DIR, 'client/public/assets');

// Load environment variables
const envPaths = [
  path.join(ROOT_DIR, 'server/.env'),
  path.join(ROOT_DIR, '.env'),
  path.resolve('server/.env'),
  path.resolve('.env')
];
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

async function uploadFileToCloudinary(localPath, folder, customPublicId) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder,
      public_id: customPublicId,
      overwrite: true,
      resource_type: 'image'
    });
    console.log(`✅ Uploaded: ${path.relative(ASSETS_DIR, localPath)} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath}:`, error.message);
    return null;
  }
}

async function uploadAllAssets() {
  console.log('========================================================');
  console.log('🚀 UPLOADING ALL LOCAL ASSETS & PHOTOS TO CLOUDINARY');
  console.log('Root Directory:', ROOT_DIR);
  console.log('Assets Directory:', ASSETS_DIR);
  console.log('========================================================\n');

  if (!fs.existsSync(ASSETS_DIR)) {
    throw new Error(`Assets directory not found at: ${ASSETS_DIR}`);
  }

  const assetMap = {};

  // 1. Upload Logo
  const logoPath = path.join(ASSETS_DIR, 'logo.jpeg');
  if (fs.existsSync(logoPath)) {
    const url = await uploadFileToCloudinary(logoPath, 'FIAUS/branding', 'logo');
    if (url) assetMap['/assets/logo.jpeg'] = url;
  }

  // 2. Upload Team Photos
  const teamDir = path.join(ASSETS_DIR, 'team');
  if (fs.existsSync(teamDir)) {
    const teamFiles = fs.readdirSync(teamDir);
    for (const file of teamFiles) {
      const filePath = path.join(teamDir, file);
      const nameWithoutExt = path.parse(file).name;
      const url = await uploadFileToCloudinary(filePath, 'FIAUS/team', nameWithoutExt);
      if (url) assetMap[`/assets/team/${file}`] = url;
    }
  }

  // 3. Upload Project Images (p1 - p5)
  const projectsDir = path.join(ASSETS_DIR, 'projects');
  if (fs.existsSync(projectsDir)) {
    const projectFolders = fs.readdirSync(projectsDir);
    for (const folder of projectFolders) {
      const folderPath = path.join(projectsDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const projectFiles = fs.readdirSync(folderPath);
        for (const file of projectFiles) {
          const filePath = path.join(folderPath, file);
          const nameWithoutExt = path.parse(file).name;
          const url = await uploadFileToCloudinary(filePath, `FIAUS/projects/${folder}`, nameWithoutExt);
          if (url) assetMap[`/assets/projects/${folder}/${file}`] = url;
        }
      }
    }
  }

  // Save assetMap to JSON for reuse
  const mapPath = path.join(__dirname, 'cloudinary-assets-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(assetMap, null, 2));
  console.log(`\n💾 Saved URL mapping to: ${mapPath}`);
  console.log(`Total Assets Uploaded to Cloudinary: ${Object.keys(assetMap).length}\n`);

  // Connect to MongoDB and update documents
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('No MONGODB_URI found, skipping database update.');
    return;
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
  console.log('✅ Connected to MongoDB Atlas');

  // Update WebsiteSettings Logo
  if (assetMap['/assets/logo.jpeg']) {
    await WebsiteSettings.updateMany({}, {
      $set: {
        logo: assetMap['/assets/logo.jpeg'],
        logoPublicId: 'FIAUS/branding/logo'
      }
    });
    console.log(`✅ Updated WebsiteSettings logo -> ${assetMap['/assets/logo.jpeg']}`);
  }

  // Update Team Members in MongoDB
  const teamMembers = await TeamMember.find();
  for (const member of teamMembers) {
    let newPhoto = null;
    if (member.name.toLowerCase().includes('fahad')) {
      newPhoto = assetMap['/assets/team/founder.jpeg'] || assetMap['/assets/team/founder.jpg'];
    } else if (member.name.toLowerCase().includes('toufiq') || member.name.toLowerCase().includes('kiron')) {
      newPhoto = assetMap['/assets/team/co-founder.jpeg'] || assetMap['/assets/team/co-founder.jpg'];
    } else if (member.name.toLowerCase().includes('nahid') || member.name.toLowerCase().includes('bulbul')) {
      newPhoto = assetMap['/assets/team/director.png'];
    }
    if (newPhoto) {
      member.photo = newPhoto;
      await member.save();
      console.log(`✅ Updated TeamMember (${member.name}) photo -> ${newPhoto}`);
    }
  }

  // Update Projects in MongoDB
  const projects = await Project.find();
  for (const project of projects) {
    let updated = false;

    // Update cover image
    if (project.coverImage && assetMap[project.coverImage]) {
      project.coverImage = assetMap[project.coverImage];
      updated = true;
    } else if (project.slug === 'acc-est' && assetMap['/assets/projects/p1/main.png']) {
      project.coverImage = assetMap['/assets/projects/p1/main.png'];
      updated = true;
    } else if (project.slug === 'rabiora-ecommerce' && assetMap['/assets/projects/p2/main.png']) {
      project.coverImage = assetMap['/assets/projects/p2/main.png'];
      updated = true;
    } else if (project.slug === 'safead-extension' && assetMap['/assets/projects/p3/main.png']) {
      project.coverImage = assetMap['/assets/projects/p3/main.png'];
      updated = true;
    } else if (project.slug === 'bangladesh-power-dashboard' && assetMap['/assets/projects/p4/main.png']) {
      project.coverImage = assetMap['/assets/projects/p4/main.png'];
      updated = true;
    } else if (project.slug === 'luxe-dining-oasis' && assetMap['/assets/projects/p5/main.png']) {
      project.coverImage = assetMap['/assets/projects/p5/main.png'];
      updated = true;
    }

    // Update screenshots
    if (Array.isArray(project.screenshots)) {
      project.screenshots = project.screenshots.map((s) => {
        const mappedUrl = assetMap[s.url];
        if (mappedUrl) {
          updated = true;
          return { ...s.toObject(), url: mappedUrl };
        }
        return s;
      });
    }

    if (updated) {
      await project.save();
      console.log(`✅ Updated Project (${project.title}) coverImage & screenshots to Cloudinary URLs`);
    }
  }

  await mongoose.disconnect();
  console.log('\n🎉 ALL PHOTOS, PROJECT IMAGES, AND LOGOS ARE FULLY UPLOADED TO CLOUDINARY & SYNCHRONIZED IN DATABASE!');
}

uploadAllAssets().catch((err) => {
  console.error('Error during asset upload:', err);
  process.exit(1);
});

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import dns from 'dns';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config({ path: path.resolve('server/.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fahadhossain04_db_user:oiLhxa7dwfFzHAPj@cluster0.f06enes.mongodb.net/fiaus_tech?retryWrites=true&w=majority';
const ADMIN_EMAIL = process.env.ADMIN_DEFAULT_EMAIL || 'fiaustech@hotmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'Fahad14113@#';

async function updateAdminCredentials() {
  console.log('=== UPDATING ADMIN CREDENTIALS ===');
  console.log('Target Email:', ADMIN_EMAIL);

  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✔ Connected to MongoDB Atlas');

    // Remove any previous admin users to ensure a clean single super admin
    await Admin.deleteMany({});
    console.log('✔ Cleaned existing admin records');

    // Create new admin (pre-save hook will hash the password)
    const newAdmin = new Admin({
      name: 'FIAUS Tech Super Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'super_admin'
    });
    await newAdmin.save();
    console.log(`✔ Admin created successfully: ${newAdmin.email}`);

    // Verify password matching
    const isMatch = await newAdmin.comparePassword(ADMIN_PASSWORD);
    console.log('✔ Password verification test:', isMatch ? 'PASSED' : 'FAILED');

    await mongoose.disconnect();
    console.log('✔ MongoDB disconnected cleanly.');
    console.log('=== ADMIN CREDENTIALS UPDATED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Error updating admin:', err.message);
  }
}

updateAdminCredentials();

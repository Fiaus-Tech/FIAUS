import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'fiaus_tech_jwt_super_secure_secret_key_2026_innovate_automate_grow',
    { expiresIn: '30d' }
  );
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const targetEmail = email.toLowerCase().trim();
    const defaultEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'fiaustech@hotmail.com').toLowerCase();
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Fahad14113@#';


    if (isMongoConnected()) {
      let admin = await Admin.findOne({ email: targetEmail });
      if (!admin && targetEmail === defaultEmail) {
        admin = await Admin.create({
          name: 'FIAUS Tech Super Admin',
          email: defaultEmail,
          password: defaultPassword,
          role: 'super_admin'
        });
      }

      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid administrative credentials.'
        });
      }

      admin.lastLogin = new Date();
      await admin.save();

      const token = generateToken(admin._id);
      return res.status(200).json({
        success: true,
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token
        }
      });
    }

    // Standalone fallback
    if (targetEmail === defaultEmail && password === defaultPassword) {
      const token = generateToken('admin_master_id');
      return res.status(200).json({
        success: true,
        data: {
          _id: 'admin_master_id',
          name: 'FIAUS Tech Super Admin',
          email: defaultEmail,
          role: 'super_admin',
          token
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid administrative credentials.'
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.admin || {
        _id: 'admin_master_id',
        name: 'FIAUS Tech Super Admin',
        email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@fiaus.tech',
        role: 'super_admin'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    if (isMongoConnected() && req.admin?._id) {
      const admin = await Admin.findById(req.admin._id);
      if (admin) {
        admin.password = newPassword;
        await admin.save();
      }
    }

    res.status(200).json({ success: true, message: 'Password successfully updated.' });
  } catch (error) {
    next(error);
  }
};


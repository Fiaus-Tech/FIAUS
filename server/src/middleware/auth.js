import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token missing or invalid. Access denied.'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fiaus_tech_jwt_super_secure_secret_key_2026_innovate_automate_grow'
    );

    if (isMongoConnected()) {
      req.admin = await Admin.findById(decoded.id).select('-password');
      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin account associated with this token no longer exists.'
        });
      }
    } else {
      req.admin = {
        _id: decoded.id || 'admin_master_id',
        name: 'FIAUS Tech Super Admin',
        email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@fiaus.tech',
        role: 'super_admin'
      };
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or expired.'
    });
  }
};


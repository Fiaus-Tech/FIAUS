import express from 'express';
import { loginAdmin, getAdminProfile, updateAdminPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.put('/update-password', protect, updateAdminPassword);

export default router;


import express from 'express';
import { getSettings, updateSettings, getDashboardMetrics } from '../controllers/settingsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, updateSettings);
router.get('/metrics', protect, getDashboardMetrics);

export default router;


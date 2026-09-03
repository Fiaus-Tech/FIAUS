import express from 'express';
import {
  submitLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead
} from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitLead);
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.put('/:id', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

export default router;


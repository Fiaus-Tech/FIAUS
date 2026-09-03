import express from 'express';
import { uploadSingleFile, uploadMultipleFiles } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/single', protect, upload.single('file'), uploadSingleFile);
router.post('/multiple', protect, upload.array('files', 10), uploadMultipleFiles);

// Lead public upload (for RFP / project briefs)
router.post('/lead-attachment', upload.single('file'), uploadSingleFile);

export default router;


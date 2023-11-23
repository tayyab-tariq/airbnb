import express from 'express';
import { profile, uploadFile, uploadLink} from '../controller/user.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/photosMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.array('files'), uploadFile);
router.get('/profile', protect, profile);
router.post('/upload-by-link', protect, uploadLink);

export default router;

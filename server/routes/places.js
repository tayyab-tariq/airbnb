import express from 'express';
import { addPlaces, getPlaces, getPlace, getUserPlaces, updatePlace } from '../controller/places.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPlaces).post(protect, addPlaces).put(protect, updatePlace);
router.get('/place/:id', getPlace);
router.get('/user', protect, getUserPlaces);


export default router;

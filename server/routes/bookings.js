import express from 'express';
import { addBooking, getBookings } from '../controller/bookings.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getBookings).post(protect, addBooking);

export default router;

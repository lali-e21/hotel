import express from 'express';
import * as bookingController from '../../controllers/booking.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router
    .route('/')
    .post(bookingController.initiateBooking)
    .get(bookingController.getMyBookings);

router
    .route('/:id')
    .get(bookingController.getBooking)
    .patch(bookingController.cancelBooking);

export default router;

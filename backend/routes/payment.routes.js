import express from 'express';
import * as paymentController from '../../controllers/payment.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/chapa-initiate', protect, paymentController.initiateChapaPayment);
router.get('/chapa-verify/:tx_ref', paymentController.verifyChapaPayment);
router.post('/stripe-initiate', protect, paymentController.initiateStripePayment);
router.post('/refund/:paymentId', protect, paymentController.refundPayment);


export default router;

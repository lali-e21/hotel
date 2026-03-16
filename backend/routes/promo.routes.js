import express from 'express';
import * as promoController from '../../controllers/promo.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Public route – validate a promo code during checkout
router.post('/validate', protect, promoController.validatePromo);

// Admin-only routes
router.use(protect, restrictTo('admin'));
router.get('/', promoController.getAllPromos);
router.post('/', promoController.createPromo);
router.patch('/:id/toggle', promoController.togglePromo);
router.delete('/:id', promoController.deletePromo);

export default router;

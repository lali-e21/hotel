import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Express 5 compatible wrapper for multer middleware
const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) return next(err);
        next();
    });
};

router
    .route('/')
    .get(serviceController.getAllServices)
    .post(protect, restrictTo('admin'), uploadImage, serviceController.createService);

router
    .route('/:id')
    .get(serviceController.getService)
    .patch(protect, restrictTo('admin'), uploadImage, serviceController.updateService)
    .delete(protect, restrictTo('admin'), serviceController.deleteService);

export default router;

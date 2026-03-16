import express from 'express';
import * as galleryController from '../../controllers/gallery.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';
import { upload } from '../../config/cloudinary.js';

const router = express.Router();

// Express 5 compatible wrapper for multer middleware
const uploadImage = (req, res, next) => {
    upload.single('imageUrl')(req, res, (err) => {
        if (err) return next(err);
        next();
    });
};

router
    .route('/')
    .get(galleryController.getAllGalleryItems)
    .post(protect, restrictTo('admin'), uploadImage, galleryController.createGalleryItem);

router
    .route('/:id')
    .patch(protect, restrictTo('admin'), uploadImage, galleryController.updateGalleryItem)
    .delete(protect, restrictTo('admin'), galleryController.deleteGalleryItem);

export default router;

import express from 'express';
import * as roomController from '../../controllers/room.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';
import { upload } from '../../config/cloudinary.js';

const router = express.Router();

// Express 5 compatible wrapper for multer middleware
const uploadImages = (req, res, next) => {
    upload.array('images', 5)(req, res, (err) => {
        if (err) return next(err);
        next();
    });
};

router
    .route('/')
    .get(roomController.getAllRooms)
    .post(protect, restrictTo('admin'), uploadImages, roomController.createRoom);

router
    .route('/:id')
    .get(roomController.getRoom)
    .patch(protect, restrictTo('admin'), uploadImages, roomController.updateRoom)
    .delete(protect, restrictTo('admin'), roomController.deleteRoom);

export default router;

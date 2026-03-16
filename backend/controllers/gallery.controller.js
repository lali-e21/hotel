import Gallery from '../models/gallery.model.js';

export const getAllGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.find({ isActive: true });
        res.status(200).json({
            status: 'success',
            results: galleryItems.length,
            data: { galleryItems },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const createGalleryItem = async (req, res) => {
    try {
        if (req.file) {
            req.body.imageUrl = req.file.path;
        }

        const newItem = await Gallery.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { galleryItem: newItem },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndUpdate(req.params.id, { isActive: false });
        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
export const updateGalleryItem = async (req, res) => {
    try {
        if (req.file) {
            req.body.imageUrl = req.file.path;
        }

        const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json({
            status: 'success',
            data: { galleryItem: item },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

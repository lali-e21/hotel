import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Gallery item title is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Gallery item category is required'],
        enum: ['Exterior', 'Interior', 'Dining', 'Pool', 'Rooms', 'Events'],
        default: 'General',
    },
    imageUrl: {
        type: String,
        required: [true, 'Gallery item image URL is required'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;

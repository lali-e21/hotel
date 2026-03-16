import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Room name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Room description is required'],
    },
    category: {
        type: String,
        required: [true, 'Room category/tier is required'],
        enum: ['Elite', 'Signature', 'Imperial'],
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Price per night cycle is required'],
    },
    capacity: {
        type: Number,
        required: [true, 'Inhabitant capacity is required'],
    },
    totalRooms: {
        type: Number,
        required: [true, 'Inventory node count is required'],
    },
    size: String,
    amenities: [String],
    images: [String],
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

export default Room;

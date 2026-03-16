import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
    },
    icon: {
        type: String,
        required: [true, 'Service icon is required'],
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['Wellness', 'Dining', 'Leisure', 'Transport', 'Business'],
        default: 'Leisure',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;

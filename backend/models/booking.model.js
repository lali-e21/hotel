import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user'],
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'Booking must belong to a room'],
    },
    checkIn: {
        type: Date,
        required: [true, 'Check-in date is required'],
    },
    checkOut: {
        type: Date,
        required: [true, 'Check-out date is required'],
    },
    guests: {
        adults: { type: Number, default: 1 },
        children: { type: Number, default: 0 },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Checked-in', 'Checked-out', 'Cancelled'],
        default: 'Pending',
    },
    bookingReference: {
        type: String,
        unique: true,
    },
    promoCode: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'partially-paid', 'refunded'],
        default: 'unpaid',
    },
}, {
    timestamps: true,
});

bookingSchema.pre('save', function (next) {
    if (!this.bookingReference) {
        this.bookingReference = `SGH-${uuidv4().split('-')[0].toUpperCase()}`;
    }
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

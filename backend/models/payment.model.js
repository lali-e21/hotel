import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: [true, 'Payment must belong to a booking'],
    },
    amount: {
        type: Number,
        required: [true, 'Payment amount is required'],
    },
    method: {
        type: String,
        enum: ['stripe', 'chapa', 'bank', 'hotel'],
        required: [true, 'Payment method is required'],
    },
    transactionId: {
        type: String,
        required: [true, 'Transaction ID is required'],
        unique: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

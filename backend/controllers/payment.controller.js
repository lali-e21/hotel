import Payment from '../models/payment.model.js';
import Booking from '../models/booking.model.js';
import PaymentService from '../services/payment.service.js';
import InvoiceService from '../services/invoice.service.js';
import { v4 as uuidv4 } from 'uuid';

export const initiateChapaPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId).populate('user');

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const tx_ref = `SGH-TX-${uuidv4().split('-')[0].toUpperCase()}`;

        const paymentData = {
            amount: booking.totalPrice,
            currency: 'ETB',
            email: booking.user.email,
            first_name: booking.user.name.split(' ')[0],
            last_name: booking.user.name.split(' ')[1] || 'Customer',
            tx_ref: tx_ref,
            callback_url: `${process.env.BASE_URL}/api/v1/payments/chapa-verify/${tx_ref}`,
            return_url: `${process.env.FRONTEND_URL}/payment-status?status=success&tx_ref=${tx_ref}`,
            'customization[title]': 'Sunrise Grand Hotel Booking',
            'customization[description]': `Payment for room booking ${booking.bookingReference}`,
        };

        const chapaResponse = await PaymentService.initializeChapa(paymentData);

        res.status(200).json({
            status: 'success',
            data: {
                paymentUrl: chapaResponse.data.checkout_url,
                tx_ref
            },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const verifyChapaPayment = async (req, res) => {
    try {
        const { tx_ref } = req.params;
        const verification = await PaymentService.verifyChapa(tx_ref);

        if (verification.status === 'success') {
            const booking = await Booking.findOneAndUpdate(
                { bookingReference: tx_ref.split('-')[1] }, // Simplified match
                { paymentStatus: 'Paid', status: 'Confirmed' },
                { new: true }
            );

            await Payment.create({
                booking: booking?._id,
                amount: verification.data.amount,
                method: 'chapa',
                status: 'completed',
                transactionId: tx_ref
            });
        }

        res.status(200).json(verification);
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const initiateStripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId).populate('room');

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const session = await PaymentService.createStripeSession(booking, req.user);

        res.status(200).json({
            status: 'success',
            data: {
                paymentUrl: session.url,
                sessionId: session.id
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const refundPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) return res.status(404).json({ message: 'Payment record not found' });
        if (payment.status !== 'completed') return res.status(400).json({ message: 'Can only refund completed payments' });

        if (payment.method === 'stripe') {
            await PaymentService.refundStripe(payment.transactionId);
        }

        payment.status = 'refunded';
        await payment.save();

        res.status(200).json({ status: 'success', message: 'Refund processed successfully' });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

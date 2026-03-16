import axios from 'axios';
import Stripe from 'stripe';

class PaymentService {
    /**
     * Initialize Chapa Transaction
     */
    static async initializeChapa(paymentData) {
        try {
            const response = await axios.post(
                'https://api.chapa.co/v1/transaction/initialize',
                paymentData,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Chapa Initialization Error:', error.response?.data || error.message);
            throw new Error('Could not initialize Chapa payment');
        }
    }

    /**
     * Verify Chapa Transaction
     */
    static async verifyChapa(tx_ref) {
        try {
            const response = await axios.get(
                `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Chapa Verification Error:', error.response?.data || error.message);
            throw new Error('Could not verify Chapa payment');
        }
    }

    /**
     * Initialize Stripe Checkout Session
     */
    static async createStripeSession(booking, user) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd', // Assuming USD for international Stripe users
                            product_data: {
                                name: `${booking.room.name} Booking`,
                                description: `Stay from ${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()}`,
                            },
                            unit_amount: Math.round((booking.totalPrice / 55) * 100), // Quick ETB to USD conversion placeholder
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/payment-status?status=success&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-status?status=failed`,
                customer_email: user.email,
                client_reference_id: booking._id.toString(),
            });
            return session;
        } catch (error) {
            console.error('Stripe Session Error:', error.message);
            throw new Error('Could not create Stripe session');
        }
    }

    /**
     * Process Refund (Stripe)
     */
    static async refundStripe(paymentIntentId) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        try {
            const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId,
            });
            return refund;
        } catch (error) {
            console.error('Refund Error:', error.message);
            throw new Error('Could not process refund');
        }
    }
}

export default PaymentService;


import Booking from '../models/booking.model.js';
import Room from '../models/room.model.js';
import BookingService from '../services/booking.service.js';
import PricingService from '../services/pricing.service.js';

export const initiateBooking = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut, guests, promoCode } = req.body;
        const userId = req.user.id;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        const isAvailable = await BookingService.checkAvailability(roomId, new Date(checkIn), new Date(checkOut));
        if (!isAvailable) {
            return res.status(400).json({ message: 'Room is not available for these dates' });
        }

        let totalPrice = PricingService.calculateTotalPrice(room, new Date(checkIn), new Date(checkOut));

        let discount = 0;
        if (promoCode) {
            discount = await BookingService.validatePromoCode(promoCode, totalPrice);
            totalPrice -= discount;
        }

        const booking = await BookingService.createBooking({
            user: userId,
            room: roomId,
            checkIn,
            checkOut,
            guests,
            totalPrice,
            promoCode,
            status: 'Pending',
        });

        res.status(201).json({
            status: 'success',
            data: { booking },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('room');
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: { bookings },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('room user');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json({
            status: 'success',
            data: { booking },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        booking.status = 'Cancelled';
        await booking.save();

        res.status(200).json({
            status: 'success',
            data: { booking },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

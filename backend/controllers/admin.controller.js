import Booking from '../models/booking.model.js';
import Room from '../models/room.model.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import Service from '../models/service.model.js';
import Gallery from '../models/gallery.model.js';

export const getDashboardStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const totalRooms = await Room.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'customer' });
        const totalServices = await Service.countDocuments({ isActive: true });
        const totalGalleryItems = await Gallery.countDocuments({ isActive: true });

        const revenueStats = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);

        const bookingsByStatus = await Booking.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats: {
                    totalBookings,
                    totalRooms,
                    totalUsers,
                    totalServices,
                    totalGalleryItems,
                    totalRevenue: revenueStats[0]?.totalRevenue || 0
                },
                bookingsByStatus
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        res.status(200).json({
            status: 'success',
            data: { booking }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('booking');
        res.status(200).json({
            status: 'success',
            results: payments.length,
            data: { payments }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email phone')
            .populate('room', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: { bookings }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

import Booking from '../models/booking.model.js';
import Room from '../models/room.model.js';
import PromoCode from '../models/promocode.model.js';
import mongoose from 'mongoose';

class BookingService {
    static async checkAvailability(roomId, checkIn, checkOut) {
        const room = await Room.findById(roomId);
        if (!room || !room.isActive) return false;

        const overlappingBookings = await Booking.find({
            room: roomId,
            status: { $in: ['Confirmed', 'Checked-in', 'Pending'] },
            checkIn: { $lt: checkOut },
            checkOut: { $gt: checkIn }
        });

        return overlappingBookings.length < room.totalRooms;
    }

    static async validatePromoCode(code, totalPrice) {
        const promo = await PromoCode.findOne({ code, isActive: true, expirationDate: { $gt: new Date() } });
        if (!promo) return 0;

        if (promo.discountType === 'percentage') {
            return (totalPrice * promo.discountValue) / 100;
        } else {
            return Math.min(promo.discountValue, totalPrice);
        }
    }

    static async createBooking(bookingData) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { room: roomId, checkIn, checkOut } = bookingData;

            const isAvailable = await this.checkAvailability(roomId, checkIn, checkOut);
            if (!isAvailable) {
                throw new Error('Room is no longer available for these dates');
            }

            const booking = new Booking(bookingData);
            await booking.save({ session });

            await session.commitTransaction();
            return booking;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}

export default BookingService;

import { create } from 'zustand';
import { differenceInCalendarDays } from 'date-fns';

const useBookingStore = create((set, get) => ({
    room: null,
    checkIn: null,
    checkOut: null,
    totalPrice: 0,
    bookingReference: null,

    setRoom: (room) => set({ room }),

    setDates: (checkIn, checkOut) => {
        const { room } = get();
        const nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        const totalPrice = room ? nights * room.pricePerNight : 0;
        set({ checkIn, checkOut, totalPrice });
    },

    setBookingReference: (ref) => set({ bookingReference: ref }),

    resetBooking: () => set({
        room: null,
        checkIn: null,
        checkOut: null,
        totalPrice: 0,
        bookingReference: null,
    }),
}));

export default useBookingStore;

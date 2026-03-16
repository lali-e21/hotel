class PricingService {
    static getPriceForDate(room, date) {
        return room.pricePerNight;
    }

    static calculateTotalPrice(room, checkIn, checkOut) {
        let total = 0;
        let currentDate = new Date(checkIn);
        const end = new Date(checkOut);

        while (currentDate < end) {
            total += this.getPriceForDate(room, currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return total;
    }
}

export default PricingService;

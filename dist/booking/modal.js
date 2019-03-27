"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Booking {
    constructor(_id, city, movieId, cinemaHallId, screen, totalSeatsBooked, bookingDate, customerName, customerEmail, movieName, paymentToken, amount) {
        this._id = _id;
        this.city = city;
        this.movieId = movieId;
        this.cinemaHallId = cinemaHallId;
        this.screen = screen;
        this.totalSeatsBooked = totalSeatsBooked;
        this.bookingDate = bookingDate;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.movieName = movieName;
        this.paymentToken = paymentToken;
        this.amount = amount;
    }
}
exports.default = Booking;
//# sourceMappingURL=modal.js.map
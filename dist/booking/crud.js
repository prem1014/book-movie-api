"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("./modal");
class CinemaCrud {
    saveBookingDetails(req, db) {
        let cinema = db.collection('tbl-booking');
        let bookingDetails = new modal_1.default(req.body._id, req.body.city, req.body.movieId, req.body.cinemaHallId, req.body.screen, req.body.totalSeatsBooked, req.body.bookingDate, req.body.customerName, req.body.customerEmail, req.body.movieName, req.body.paymentToken, req.body.amount);
        console.log(bookingDetails);
        return cinema.insertOne(bookingDetails)
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    getBooking(req, db) {
        let cinema = db.collection('tbl-booking');
        let queryCondition = {};
        let queryRes;
        let query = {
            $and: []
        };
        if (req.query) {
            for (let k in req.query) {
                queryCondition[k] = req.query[k];
            }
            query.$and.push(queryCondition);
            queryRes = cinema.find(query).toArray();
        }
        else {
            queryRes = cinema.find({}).toArray();
        }
        console.log(query);
        return queryRes
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    updateCinema(req, db) {
        let cinema = db.collection('tbl-booking');
        return cinema.update({ _id: req.params.id }, { $set: {
                city: req.body.city,
                hallName: req.body.hallName,
                screen: req.body.screen,
                totalSeats: req.body.totalSeats
            }
        })
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    deleteCinema(req, db) {
        let cinema = db.collection('tbl-booking');
        console.log(req.params.id);
        return cinema.remove({ _id: req.params.id })
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
}
exports.default = new CinemaCrud();
//# sourceMappingURL=crud.js.map
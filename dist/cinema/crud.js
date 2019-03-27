"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("./modal");
class CinemaCrud {
    saveCinema(req, db) {
        let cinema = db.collection('tbl-cinema');
        let cinemaDetails = new modal_1.default(req.body._id, req.body.city, req.body.hallName, req.body.screen);
        console.log(cinemaDetails);
        return cinema.insertOne(cinemaDetails)
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    getCinema(req, db) {
        let cinema = db.collection('tbl-cinema');
        return cinema.find({}).toArray()
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    updateCinema(req, db) {
        let cinema = db.collection('tbl-cinema');
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
        let cinema = db.collection('tbl-cinema');
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
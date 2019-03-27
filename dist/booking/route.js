"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoDb_1 = require("../common/mongoDb");
const crud_1 = require("./crud");
class BookingRoutes {
    constructor() {
        this.router = express_1.Router();
    }
    initBookingRoute(app) {
        this.router.route('/booking')
            .post((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                crud_1.default.saveBookingDetails(req, dbClient.db(mongoDb_1.default.dbName))
                    .then(result => {
                    let response;
                    if (result.code === 11000) {
                        response = {
                            errorCode: 11000,
                            type: 'dbError'
                        };
                    }
                    else {
                        response = result;
                    }
                    res.json(response);
                    res.status(200).end();
                })
                    .catch(err => {
                    console.log('insert error error: ' + err);
                    res.json({ error: err });
                });
            })
                .catch(err => {
                console.log('db connection error: ' + err);
                res.json({ error: err });
            });
        })
            .get((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                crud_1.default.getBooking(req, dbClient.db(mongoDb_1.default.dbName))
                    .then(result => {
                    let payload = {
                        data: result,
                        token: ''
                    };
                    res.json(payload);
                })
                    .catch(err => {
                    res.json({ message: 'Error: ' + err });
                });
            })
                .catch(err => {
                res.json({ message: 'Error: ' + err });
            });
        });
        this.router.route('/booking/:id')
            .put((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                crud_1.default.updateCinema(req, dbClient.db(mongoDb_1.default.dbName))
                    .then(result => {
                    res.json({ result: result });
                })
                    .catch(err => {
                    res.json({ error: err });
                });
            })
                .catch(err => {
                res.json({ error: err });
            });
        })
            .delete((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                crud_1.default.deleteCinema(req, dbClient.db(mongoDb_1.default.dbName))
                    .then(result => {
                    res.json({ result: result });
                })
                    .catch(err => {
                    res.json({ error: err });
                });
            })
                .catch(err => {
                res.json({ error: err });
            });
        });
        app.use('/api', this.router);
    }
}
exports.default = new BookingRoutes();
//# sourceMappingURL=route.js.map
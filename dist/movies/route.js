"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoDb_1 = require("../common/mongoDb");
const crud_1 = require("./crud");
class MoviesRoutes {
    constructor() {
        this.router = express_1.Router();
    }
    initMoviesRoute(app) {
        this.router.route('/movies')
            .post((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                crud_1.default.saveMovie(req, dbClient.db(mongoDb_1.default.dbName))
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
                crud_1.default.getMovies(req, dbClient.db(mongoDb_1.default.dbName))
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
        this.router.route('/movies/:id')
            .put((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                crud_1.default.updateMovie(req, dbClient.db(mongoDb_1.default.dbName))
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
                crud_1.default.deleteMovie(req, dbClient.db(mongoDb_1.default.dbName))
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
exports.default = new MoviesRoutes();
//# sourceMappingURL=route.js.map
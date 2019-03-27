"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoDb_1 = require("../common/mongoDb");
const crud_1 = require("./crud");
const utility_1 = require("../common/utility");
class LoginRoute {
    constructor() {
        console.log('LoginRoute init');
        this.router = express_1.Router();
    }
    initLoginRoute(app) {
        this.router.route('/login')
            .post((req, res) => {
            mongoDb_1.default.connect()
                .then(dbClient => {
                if (dbClient && dbClient.code === 18) {
                    res.json({ message: 'DB authentication error' });
                    res.status(401).end();
                }
                else if (dbClient && dbClient.code !== 18) {
                    if (req.body.user.role) {
                        console.log(req.body.user);
                        req.body.user.password = utility_1.default.getBase64Password(req.body.user.password);
                        crud_1.default.createUser(req, dbClient.db(mongoDb_1.default.dbName))
                            .then(result => {
                            if (result.code === 11000) {
                                res.json({ message: 'This email id is already registered with us. Please try with different email id' });
                                res.status(500).end();
                            }
                            else {
                                res.json(result);
                                res.status(200).end();
                            }
                        })
                            .catch(err => {
                            res.json({ message: err.message, errorCode: 'Code syntax error' });
                            res.status(200).end();
                        });
                    }
                    else {
                        crud_1.default.getUserInfo(req, dbClient.db(mongoDb_1.default.dbName))
                            .then(result => {
                            console.log(result);
                            if (result.length > 0) {
                                console.log('result' + result);
                                if (utility_1.default.getBase64Password(req.body.user.password) === result[0].password) {
                                    let token = utility_1.default.getToken({ user: { name: result[0].name, role: result[0].role, _id: result[0]._id }, exp: req.body.user.tokenExpiry });
                                    utility_1.default.verifyToken(token, (data) => {
                                        if (data.valid) {
                                            res.json(Object.assign({}, data.decodedData, { token: token, isAthenticated: true }));
                                            res.status(200).end();
                                        }
                                        else {
                                            res.json({ message: '' });
                                            res.status(401).end();
                                        }
                                    });
                                }
                                else {
                                    res.json({ message: 'Invalid user id and password', errorCode: 401 });
                                    res.status(401).end();
                                }
                            }
                            else {
                                res.json({ message: 'Ne records found', errorCode: 'SYN_001' });
                                res.status(200).end();
                            }
                        })
                            .catch(err => {
                            res.json({ message: err.message, errorCode: 'SYN_001' });
                            res.status(200).end();
                        });
                    }
                }
                else {
                    res.json({ message: 'Database connection error' });
                    res.status(200).end();
                }
            })
                .catch(err => {
                res.json({ message: err.message, errorCode: 'SYN_001' });
                res.status(200).end();
            });
        });
        app.use('/api', this.router);
    }
}
exports.default = new LoginRoute();
//# sourceMappingURL=route.js.map
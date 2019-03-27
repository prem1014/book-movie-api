"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class Utility {
    constructor() {
        this.APP_TOKEN_KEY = 'book-movie';
    }
    getToken(payload) {
        this.payload = payload;
        console.log('payload: ' + payload);
        let token = jsonwebtoken_1.sign(payload, this.APP_TOKEN_KEY);
        console.log('token:' + token);
        return token;
    }
    verifyToken(token, callback) {
        jsonwebtoken_1.verify(token, this.APP_TOKEN_KEY, (err, decodecToken) => {
            console.log('decodecToken: ' + decodecToken);
            if (!decodecToken) {
                decodecToken = this.payload;
            }
            console.log('decodecToken: ' + decodecToken);
            if (err) {
                console.log(err);
                callback({ message: 'Token is not valid', valid: false });
            }
            else {
                callback({ decodedData: decodecToken, valid: true });
            }
        });
    }
    getBase64Password(password) {
        return Buffer.from(password).toString('base64');
    }
    isRequestHasToken(req) {
        let token = null;
        token = req.body.token || req.query.token;
        if (token)
            return true;
        return false;
    }
}
exports.default = new Utility();
//# sourceMappingURL=utility.js.map
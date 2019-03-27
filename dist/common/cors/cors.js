"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
class CorsApp {
    constructor() {
    }
    getCorsOptionsAllowed() {
        let corsAllowed = ['http://192.168.0.16:3000', 'http://localhost:4200'];
        //let corsAllowed = ['*'];
        let corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            origin: (origin, callback) => {
                if (corsAllowed.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            preflightContinue: false
        };
        return cors(corsOptions);
    }
}
exports.default = new CorsApp();
//# sourceMappingURL=cors.js.map
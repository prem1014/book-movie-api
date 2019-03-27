"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("./common/cors/cors");
const route_1 = require("./cinema/route");
const route_2 = require("./movies/route");
const route_3 = require("./booking/route");
const route_4 = require("./login/route");
class Routes {
    static initRoutes(app) {
        //Enable cors for the client side app
        app.use(cors_1.default.getCorsOptionsAllowed());
        //enable pre-flight
        app.options('*', cors_1.default.getCorsOptionsAllowed());
        route_1.default.initBookingRoute(app);
        route_2.default.initMoviesRoute(app);
        route_3.default.initBookingRoute(app);
        route_4.default.initLoginRoute(app);
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map
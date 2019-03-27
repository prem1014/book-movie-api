"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoDBInstance {
    constructor() {
        this.dbUrl = 'mongodb://admin:admin123@ds151753.mlab.com:51753/book_movie';
        this.dbName = 'book_movie';
    }
    connect() {
        return mongodb_1.MongoClient.connect(this.dbUrl)
            .then(db => {
            return db;
        })
            .catch(err => {
            console.log(err);
            return err;
        });
    }
}
exports.default = new MongoDBInstance();
//# sourceMappingURL=mongoDb.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("./modal");
class UserLoginCrud {
    constructor() {
        console.log('UserLoginCrud init');
    }
    createUser(req, dbName) {
        let tblUser = dbName.collection('tbl-user');
        let user = new modal_1.default(req.body._id, req.body.name, req.body.role, req.body.password);
        return tblUser.insertOne(user)
            .then(data => {
            return data;
        })
            .catch(err => {
            return err;
        });
    }
    getUserInfo(req, dbName) {
        let tblUser = dbName.collection('tbl-user');
        let query = {
            _id: ''
        };
        if (req.param && req.param.id) {
            query._id = req.param.id;
        }
        else if (req.body.user) {
            query._id = req.body.user._id;
        }
        console.log(query);
        return tblUser.find(query).toArray()
            .then(data => {
            console.log(data);
            return data;
        })
            .catch(err => {
            return err;
        });
    }
}
exports.default = new UserLoginCrud();
//# sourceMappingURL=crud.js.map
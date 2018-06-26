"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class DB {
    constructor() {
        //this.data = this.readFromJson();
        this.tree = this.readTree();
        this.users = this.readUsers();
    }
    getData(context) {
        return new Promise(resolve => {
            const data = fs.readFileSync(__dirname + context);
            const data2 = JSON.parse(data);
            resolve(data2);
        });
    }
    setData(context, data) {
        fs.writeFileSync(__dirname + context, JSON.stringify(data));
    }
    readTree() {
        const data = fs.readFileSync(__dirname + '/tree.json');
        return JSON.parse(data);
    }
    readUsers() {
        const data = fs.readFileSync(__dirname + '/users.json');
        return JSON.parse(data);
    }
    getTree() {
        return new Promise((resolve) => {
            resolve(this.tree);
        });
    }
}
exports.default = DB;
// module.exports = DB;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const db = new db_1.default();
class User {
    constructor(name, id, age) {
        this.name = name;
        this.id = id;
        this.age = age;
    }
    static getUsers() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield db.getData(this.context).then(value => {
                resolve(value);
            });
        }));
    }
    static addUser(user) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let users = yield db.getData(this.context).then((value) => {
                return value;
            });
            if (users.length != 0) {
                user.id = users[users.length - 1].id + 1;
                users.push(user);
                db.setData(this.context, users);
                resolve(users);
            }
            else {
                user.id = 1;
                users.push(user);
                db.setData(this.context, users);
                resolve(users);
            }
        }));
    }
    static deleteUser(user) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let users = yield db.getData(this.context).then((value) => {
                return value;
            });
            let usersConnection = yield db.getData(this.connectionsList).then((value) => {
                return value;
            });
            const index = this.getIndex(users, user.id);
            const deletedUser = users.splice(index, 1);
            const newUsersConnection = usersConnection.filter((value) => {
                if (value.id != user.id || value.type != "user") {
                    return value;
                }
            });
            db.setData(this.context, users);
            db.setData(this.connectionsList, newUsersConnection);
            resolve(users);
        }));
    }
    static updateUser(user) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let users = yield db.getData(this.context).then((value) => {
                return value;
            });
            console.log(users);
            const index = this.getIndex(users, user.id);
            users[index] = user;
            db.setData(this.context, users);
            resolve(users);
        }));
    }
    static getIndex(users, id) {
        let index;
        users.forEach((value, i) => {
            if (value.id == id) {
                index = i;
            }
        });
        return index;
    }
}
User.context = '/users.json';
User.connectionsList = '/groupConnections.json';
exports.default = User;

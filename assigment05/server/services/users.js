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
const model_1 = require("../model");
const db = new db_1.default();
function getUsers() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const users = yield model_1.UserModel.getUsers().then((value) => (resolve(value)));
        return (users);
    }));
}
exports.getUsers = getUsers;
function createUser(user) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const users = yield model_1.UserModel.addUser(user).then((value) => (resolve(value)));
        return (users);
    }));
}
exports.createUser = createUser;
function deleteUser(user) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const users = yield model_1.UserModel.deleteUser(user).then((value) => (resolve(value)));
        return (users);
    }));
}
exports.deleteUser = deleteUser;
function updateUser(user) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const users = yield model_1.UserModel.updateUser(user).then((value) => (resolve(value)));
        return (users);
    }));
}
exports.updateUser = updateUser;

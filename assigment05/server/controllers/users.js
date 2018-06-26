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
const services = require("../services");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResult = yield services.getUsers();
        res.json(serviceResult);
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const serviceResult = yield services.createUser(req.body);
        res.json(serviceResult);
    });
}
exports.createUser = createUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const serviceResult = yield services.deleteUser(req.body);
        res.json(serviceResult);
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body + " CONTROLLER");
        const serviceResult = yield services.updateUser(req.body);
        res.json(serviceResult);
    });
}
exports.updateUser = updateUser;

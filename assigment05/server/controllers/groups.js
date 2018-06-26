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
function getGroups(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResult = yield services.getGroups();
        res.json(serviceResult);
    });
}
exports.getGroups = getGroups;
function deleteGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResult = yield services.deleteGroup(req.body.data);
        res.json(serviceResult);
    });
}
exports.deleteGroup = deleteGroup;
function addGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const serviceResult = yield services.addGroup(req.body);
        console.log(serviceResult);
    });
}
exports.addGroup = addGroup;
function addUserToGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const serviceResult = yield services.addUserToGroup(req.body);
        console.log(serviceResult);
        res.json(serviceResult);
    });
}
exports.addUserToGroup = addUserToGroup;

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
const model_1 = require("../model");
const group_1 = require("../model/group");
function getGroups() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const groups = yield model_1.GroupsModel.getGroups().then(value => {
            return value;
        });
        resolve(groups);
    }));
}
exports.getGroups = getGroups;
function addGroup(obj) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        console.log(obj);
        const group = new group_1.default(obj.name);
        yield model_1.GroupsModel.addGroup(group, obj.parentId).then();
    }));
}
exports.addGroup = addGroup;
function deleteGroup(id) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const groups = yield model_1.GroupsModel.deleteGroup(id).then(value => {
            resolve(value);
        });
        return (groups);
    }));
}
exports.deleteGroup = deleteGroup;
function addUserToGroup(obj) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        yield model_1.GroupsModel.addUserToGroup(obj.groupId, obj.userId);
    }));
}
exports.addUserToGroup = addUserToGroup;

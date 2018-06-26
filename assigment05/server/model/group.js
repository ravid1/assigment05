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
class Group {
    constructor(name) {
        this.name = name;
        //this.id = uidgen.generateSync();
    }
    static getGroups() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield db.getData(this.groupsList).then(value => {
                resolve(value);
            });
        }));
    }
    static addGroup(newGroup, parentId) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let groups = yield db.getData(this.groupsList).then((value) => {
                return value;
            });
            newGroup.id = (groups[groups.length - 1].id + 1);
            const groupTableItem = { id: newGroup.id, parent: parentId, type: "empty group" };
            let list = yield db.getData(this.groupsConnection).then((value) => {
                return value;
            });
            const index = this.getIndex(parentId, list);
            if (list[index].type == "empty group" || list[index].type == "containing groups") {
                list[index].type = "containing groups";
                list.push(groupTableItem);
                db.setData(this.groupsConnection, list);
                groups.push(newGroup);
                db.setData(this.groupsList, groups);
            }
            resolve(newGroup);
        }));
    }
    static deleteGroup(id) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let groupList = yield db.getData(this.groupsList).then((value) => {
                return value;
            });
            let connectionList = yield db.getData(this.groupsConnection).then((value) => {
                return value;
            });
            const list = yield this.deleteGroups(id, connectionList, groupList);
            db.setData(this.groupsList, list);
        }));
    }
    static addUserToGroup(groupId, userId) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let list = yield db.getData(this.groupsConnection).then((value) => {
                return value;
            });
            const groupList = yield db.getData(this.groupsList).then((value) => {
                return value;
            });
            const index = this.getIndex(groupList, groupId);
            let groupTableElement = list[index];
            if (groupTableElement.type == "empty group" || groupTableElement.type == "containing groups") {
                console.log(groupTableElement.type);
                const connectionTableObj = { id: userId, parent: groupId, type: "user" };
                list.push(connectionTableObj);
                db.setData(this.groupsConnection, list);
                groupTableElement.type = "containing users";
                list[index] = groupTableElement;
                db.setData(this.groupsConnection, list);
                resolve(connectionTableObj);
            }
            else {
                resolve("Can't add User to group");
            }
        }));
    }
    static getIndex(groups, id) {
        let index;
        groups.forEach((value, i) => {
            if (value.id == id) {
                index = i;
            }
        });
        return index;
    }
}
Group.groupsList = '/groups.json';
Group.groupsConnection = '/groupConnections.json';
Group.deleteGroups = (id, connectionList, groupList) => __awaiter(this, void 0, void 0, function* () {
    const deleteList = [];
    let temp = 0;
    const index = Group.getIndex(groupList, id);
    groupList.splice(index, 1);
    const newConnectionList = connectionList.filter((element) => {
        if (element.parent == id) {
            deleteList.push(element.id);
        }
        else if (element.id != id /*&& element.type==="group"*/) {
            return element;
        }
    });
    console.log("=======================================");
    console.log(newConnectionList);
    console.log("=======================================");
    if (!deleteList.length) {
        db.setData(Group.groupsConnection, newConnectionList);
    }
    deleteList.forEach((value) => __awaiter(this, void 0, void 0, function* () {
        yield Group.deleteGroups(value, newConnectionList, groupList);
    }));
    console.log("++++++++++++++++++++++++++++++++++++++++");
    console.log(newConnectionList);
    console.log("++++++++++++++++++++++++++++++++++++++++");
    return groupList;
});
exports.default = Group;

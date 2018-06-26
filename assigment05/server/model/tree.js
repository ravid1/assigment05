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
class Tree {
    constructor() {
        this.myTree = [];
    }
    static buildTree() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let usersList = yield db.getData(this.userList).then((value) => {
                return value;
            });
            let groupList = yield db.getData(this.groupsList).then((value) => {
                return value;
            });
            let connectionList = yield db.getData(this.groupsConnection).then((value) => {
                return value;
            });
            var tree = [yield this.buildTemplate(connectionList[0].id, null, "group", connectionList, groupList, usersList)];
            db.setData(this.treeObject, tree);
            resolve(tree);
        }));
    }
}
Tree.groupsList = '/groups.json';
Tree.groupsConnection = '/groupConnections.json';
Tree.treeObject = '/tree2.json';
Tree.userList = '/users.json';
Tree.counter = 0;
Tree.buildTemplate = (id, parentId, type, list, groupList, usersList) => __awaiter(this, void 0, void 0, function* () {
    let obj = { id: 0, name: "", items: [], messages: [], type: "" };
    obj.id = id;
    if (type != "user") {
        obj.type = "group";
        groupList.forEach((value) => {
            if (value.id == id) {
                obj.name = value.name;
            }
        });
    }
    else {
        obj.type = "user";
        usersList.forEach((value) => __awaiter(this, void 0, void 0, function* () {
            if (value.id == id) {
                obj.name = value.name;
            }
        }));
    }
    obj.messages = [];
    let childrens = [];
    if (type != "user") {
        childrens = list.filter((value) => {
            if (value.parent == id) {
                return value;
            }
        });
        childrens.forEach((value) => __awaiter(this, void 0, void 0, function* () {
            obj.items.push(yield Tree.buildTemplate(value.id, id, value.type, list, groupList, usersList));
        }));
    }
    return obj;
});
exports.default = Tree;

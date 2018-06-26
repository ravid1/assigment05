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
const tree_1 = require("../model/tree");
function getTree() {
    const db = new db_1.default();
    const tree = new tree_1.default();
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        /*const tree = await db.getTree().then((value) => (
            resolve(value)
        ));*/
        tree_1.default.buildTree().then(value => {
            resolve(value);
        });
    }));
}
exports.getTree = getTree;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const languages_1 = require("./languages");
exports.LanguagesController = languages_1.default;
const tree_1 = require("./tree");
exports.TreeController = tree_1.default;
const users_1 = require("./users");
exports.getUsers = users_1.getUsers;
exports.createUser = users_1.createUser;
exports.deleteUser = users_1.deleteUser;
exports.updateUser = users_1.updateUser;
const groups_1 = require("./groups");
exports.getGroups = groups_1.getGroups;
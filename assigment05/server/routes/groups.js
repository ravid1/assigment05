"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const groupController = require("../controllers/groups");
const router = express.Router();
router.get('/', groupController.getGroups);
router.delete('/', groupController.deleteGroup);
router.post('/', groupController.addGroup);
router.post('/user', groupController.addUserToGroup);
exports.default = router;

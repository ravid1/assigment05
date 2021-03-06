"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require("../controllers");
const router = express.Router();
router.get('/', controllers.getUsers);
router.post('/', express.json(), controllers.createUser);
router.delete('/', express.json(), controllers.deleteUser);
router.put('/', express.json(), controllers.updateUser);
exports.default = router;

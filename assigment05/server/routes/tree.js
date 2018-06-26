"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Controllers = require("../controllers");
const router = express.Router();
router.get('/', Controllers.TreeController);
exports.default = router;

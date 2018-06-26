"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Controllers = require("../controllers");
const router = express.Router();
router.get('/languages', Controllers.LanguagesController);
// If there are more than two arguments, the second argument will be
// counted as a middleware
// router.post('/:lang', express.json(), );
exports.default = router;

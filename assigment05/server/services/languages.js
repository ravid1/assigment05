"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AVAILABLE_LANGUAGES = ['english', 'spanish', 'Gay Ori'];
function LanguageService() {
    return new Promise((resolve, reject) => {
        return resolve(AVAILABLE_LANGUAGES);
    });
}
exports.default = LanguageService;

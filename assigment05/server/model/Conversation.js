"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const db = new db_1.default();
class Conversation {
    constructor(type, id, to = null) {
    }
    buildConversation() {
        const messages = db.getData('messages.json');
        const connections = db.getData('messagesConnections.json');
        const list = this.type == "group" ? connections['groupsToMessages'] : connections['usersToMessages'];
    }
}

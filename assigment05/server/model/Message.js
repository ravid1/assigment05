"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(id, sender, receiver, content) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }
}
exports.default = Message;

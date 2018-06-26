import Message from './Message';
import DB from '../db/db';
const db = new DB();

class Conversation{
    private messages: Message[];
    private id: string;
    private type: string;
    private to: string;

    constructor(type: string , id: string, to: string = null){
    }

    public buildConversation(){
        const messages = db.getData('messages.json');
        const connections = db.getData('messagesConnections.json');
        const list = this.type=="group" ?  connections['groupsToMessages'] : connections['usersToMessages'];

    }
}
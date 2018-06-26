import User from "./User";


export default class Message{
    id: number;
    sender: User |string;
    receiver: User |string;
    content: string;
    time: string;

    constructor(id:number , sender: User |string , receiver: User |string , content: string ){
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }


}
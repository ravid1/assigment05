import {Iuser} from '../model/User'
const fs = require('fs');

export default class DB {
    data: any;
    tree: any;
    users: any;
    constructor() {
        //this.data = this.readFromJson();
        this.tree = this.readTree();
        this.users = this.readUsers();
    }

    getData(context: string) {
        return new Promise(resolve => {
            const data = fs.readFileSync(__dirname + context);
            const data2 = JSON.parse(data);
            resolve(data2);
        });
    }

    setData(context: string, data: any){
        fs.writeFileSync(__dirname + context, JSON.stringify(data));
    }

    private readTree() {
        const data = fs.readFileSync(__dirname + '/tree.json');
        return JSON.parse(data);
    }

    private readUsers() {
        const data = fs.readFileSync(__dirname + '/users.json');
        return JSON.parse(data);
    }

    getTree() {
        return new Promise((resolve)=>{
            resolve(this.tree);
        });
    }

}

// module.exports = DB;
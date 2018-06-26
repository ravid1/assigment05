import DB from '../db/db';
import IgroupTable from "../interfaces";
const db = new DB();

export interface Iuser {
    name: string
    id: any
    age: number
}

export default class User implements Iuser{
    name: string;
    id: string;
    age: number;

    static context = '/users.json';
    static connectionsList = '/groupConnections.json';

    constructor(name: string, id: string, age: number){
        this.name = name;
        this.id = id;
        this.age = age;
    }

    static getUsers(){
        return new Promise(async(resolve) => {
            await db.getData(this.context).then(value => {
                resolve(value);
            });
        });
    }

    static addUser(user: Iuser){
        return new Promise( async(resolve) => {
            let users = await db.getData(this.context).then((value: Iuser[]) => {
                return value;
            });
            if(users.length != 0) {
                user.id = users[users.length - 1].id + 1;
                users.push(user);
                db.setData(this.context,users);
                resolve(user);
            }

            else{
                user.id = 1;
                users.push(user);
                db.setData(this.context,users);
                resolve(user);
            }
        });
    }

    static deleteUser(user) {
        return new Promise(async (resolve) => {
            let users = await db.getData(this.context).then((value: Iuser[]) => {
                return value;
            });
            let usersConnection = await db.getData(this.connectionsList).then((value: IgroupTable[]) => {
                return value;
            });
            const index = this.getIndex(users,user.id);
            const deletedUser = users.splice(index,1);
            const newUsersConnection = usersConnection.filter((value: IgroupTable) =>{
                if(value.id!=user.id || value.type!="user"){
                    return value;
                }
            });
            db.setData(this.context,users);
            db.setData(this.connectionsList,newUsersConnection);
            resolve(deletedUser[0]);
        });
    }

    static updateUser(user) {
        return new Promise( async (resolve) => {
            let users = await db.getData(this.context).then((value: Iuser[]) => {
                return value;
            });
            console.log(users);
            const index = this.getIndex(users,user.id);
            users[index] = user;
            db.setData(this.context,users);
            resolve(user);
        });
    }

    private static getIndex(users: Iuser[], id: any){
        let index;
        users.forEach((value, i) =>{
            if(value.id==id){
                index = i;
            }
        });
        return index;
    }
}


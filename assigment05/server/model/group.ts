import DB from '../db/db';
// import * as UIDGenerator from 'uid-generator';
// const uidgen = new UIDGenerator(UIDGenerator.BASE16);
import {Iuser} from "./User";
import IgroupTable from "../interfaces";
const db = new DB();

export default interface Igroup{
    name: string
    id: number
}

export default class Group implements Igroup{

    name: string;
    id: number;

    static groupsList = '/groups.json';
    static groupsConnection = '/groupConnections.json';

    constructor(name: string){
        this.name = name;
        //this.id = uidgen.generateSync();
    }

    static getGroups(){
        return new Promise(async (resolve)=> {
            const groups = await db.getData(this.groupsList).then((data:Igroup[]) => {
                return data;
            });
            let groupsConnection = await db.getData(this.groupsConnection).then((data:IgroupTable[]) => {
                return data;
            });
            let newList = [];
            groups.forEach((group: Igroup) => {
                for(let groupTable of groupsConnection){
                    if(group.id==groupTable.id && groupTable.type!="user"){
                        newList.push({id: group.id, name: group.name, type: groupTable.type});
                    }
                }
            });
            resolve(newList);
        });
    }

    static addGroup(newGroup: any, parentId: any){
        return new Promise(async (resolve) =>{
            let groups = await db.getData(this.groupsList).then((value: Igroup[]) => {
                return value;
            });
            newGroup.id = (groups[groups.length-1].id +1);
            const groupTableItem: IgroupTable = {id: newGroup.id , parent: parentId , type: "empty group"};
            let list = await db.getData(this.groupsConnection).then((value: IgroupTable[]) => {
                return value;
            });
            const index = this.getIndex(list,parentId);
            if(list[index].type=="empty group" || list[index].type=="containing groups") {
                list[index].type="containing groups";
                list.push(groupTableItem);
                db.setData(this.groupsConnection, list);

                groups.push(newGroup);
                db.setData(this.groupsList, groups);
            }
            resolve(groups);
        });
    }

    static deleteGroup(id: number){
        return new Promise(async (resolve)=> {
            let groupList = await db.getData(this.groupsList).then((value:Igroup[]) => {
                return value;
            });
            let connectionList = await db.getData(this.groupsConnection).then((value: IgroupTable[]) => {
                return value;
            });

            const list = await this.deleteGroups(id,connectionList,groupList);
            db.setData(this.groupsList,list);
        });
    }

    private static deleteGroups = async(id: any,connectionList :IgroupTable[], groupList: Igroup[])=>{
        const deleteList = [];
        let temp=0;
        const index = Group.getIndex(groupList,id);
        groupList.splice(index,1);
        const newConnectionList = connectionList.filter((element: IgroupTable)=>{
            if(element.parent==id){
                deleteList.push(element.id);
            }
            else if(element.id!=id /*&& element.type==="group"*/){
                return element;
            }
        });

        if(!deleteList.length){
            db.setData(Group.groupsConnection,newConnectionList);
        }
        deleteList.forEach(async (value) =>{
            await Group.deleteGroups(value,newConnectionList,groupList);
        });

        return groupList;
    }

    static addUserToGroup(groupId: any, userId: any){
        return new Promise(async(resolve) => {
            let list = await db.getData(this.groupsConnection).then((value: IgroupTable[]) => {
                return value;
            });
            const groupList = await db.getData(this.groupsList).then((value: Igroup[]) => {
                return value;
            });
            const index = this.getIndex(groupList,groupId);
            let groupTableElement = list[index];
            if(groupTableElement.type=="empty group" || groupTableElement.type=="containing users") {
                console.log(groupTableElement.type);
                const connectionTableObj: IgroupTable = {id: userId, parent: groupId, type: "user"};
                list.push(connectionTableObj);
                db.setData(this.groupsConnection, list);
                groupTableElement.type = "containing users";
                list[index] = groupTableElement;
                db.setData(this.groupsConnection,list);
                resolve();
            }
            else{
                resolve("Can't add User to group")
            }
        });
    }

    private static getIndex(groups: any[], id: any){
        let index;
        groups.forEach((value, i)=>{
            if(value.id==id){
                index = i;
            }
        });
        return index;
    }

    /*static addGroup(name:string){
        return new Promise( async(resolve) => {
            let users = await db.getData(this.groupsList).then((value: Iuser[]) => {
                return value;
            });
            if(users.length != 0) {
                user.id = users[users.length - 1].id + 1;
                users.push(user);
                db.setData(this.groupsList,users);
                resolve(user);
            }

            else{
                user.id = 1;
                users.push(user);
                db.setData(this.groupsList,users);
                resolve(user);
            }
        });
    }*/

}
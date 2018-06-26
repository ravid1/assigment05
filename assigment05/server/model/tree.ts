import DB from '../db/db';
const db = new DB();
import Igroup from './group';
import IgroupTable from '../interfaces';

interface Itree{
    type: string
    name: string
    id: any
    messages: any
    items?: any[]
}

export default class Tree{

    static groupsList = '/groups.json';
    static groupsConnection = '/groupConnections.json';
    static treeObject = '/tree2.json';
    static userList = '/users.json';
    private myTree: any[];
    static counter = 0;

    constructor(){
        this.myTree =[];
    }

    static buildTree(){
        return new Promise(async (resolve) => {
            let usersList = await
                db.getData(this.userList).then((value: any[]) => {
                    return value;
                });
            let groupList = await
            db.getData(this.groupsList).then((value: Igroup[]) => {
                return value;
            });
            let connectionList = await
            db.getData(this.groupsConnection).then((value: IgroupTable[]) => {
                return value;
            });
            var tree = [await this.buildTemplate(connectionList[0].id, null, "group", connectionList, groupList,usersList)];
            db.setData(this.treeObject, tree);
            resolve(tree);
        });
    }

    static buildTemplate = async(id: any, parentId: any, type: any, list: IgroupTable[],groupList: Igroup[],usersList: any[])=> {
        let obj: Itree = {id: 0, name: "", items: [], messages: [], type: ""};
        obj.id = id;
        if(type!="user") {
            obj.type = "group";
            groupList.forEach( (value: Igroup) => {
                if (value.id == id) {
                    obj.name = value.name;
                }
            });
        }
        else{
            obj.type = "user";
            usersList.forEach(async (value: Igroup) => {
                if (value.id == id ) {
                    obj.name = value.name;
                }
            });
        }
        obj.messages = [];

        let childrens = [];
        if (type != "user") {
            childrens = list.filter((value: IgroupTable) => {
                if (value.parent == id) {
                    return value;
                }
            });
            childrens.forEach(async(value: IgroupTable) =>{
                obj.items.push( await Tree.buildTemplate(value.id,id,value.type,list,groupList,usersList));
            });
        }
        return obj;
    }
}
import {GroupsModel} from '../model';
import Group from "../model/group";

export function getGroups() {

    return new Promise(async(resolve) => {
        const groups = await GroupsModel.getGroups().then(value => {
            resolve(value);
        });
        return (groups);
    })
}

export function deleteGroup(id: number) {

    return new Promise(async(resolve) => {
        const groups = await GroupsModel.deleteGroup(id).then(value => {
            resolve(value);
        });
        return (groups);
    })
}

export function addGroup(obj){
    console.log(obj);
    return new Promise(async (resolve) => {
        const group = new Group(obj.name);
        await GroupsModel.addGroup(group,obj.parentId).then();
    });
}

export function addUserToGroup(obj){
    console.log(obj);
    return new Promise(async (resolve) =>{
        await GroupsModel.addUserToGroup(obj.groupId,obj.userId);
    });
}
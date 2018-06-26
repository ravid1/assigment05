import DB from '../db/db';
import {UserModel} from '../model';

const db = new DB();

export function getUsers() {

    return new Promise(async (resolve, reject) => {
        const users = await UserModel.getUsers().then((value) => (
            resolve(value)
        ));
        return (users);
    });
}

export function createUser(user) {

    return new Promise(async (resolve, reject) => {
        const users = await UserModel.addUser(user).then((value) => (
            resolve(value)
        ));
        return (users);
    });
}

export function deleteUser(user) {

    return new Promise(async (resolve, reject) => {
        const users = await UserModel.deleteUser(user).then((value) => (
            resolve(value)
        ));
        return (users);
    });
}

export function updateUser(user) {
    return new Promise(async (resolve, reject) => {
        const users = await UserModel.updateUser(user).then((value) => (
            resolve(value)
        ));
        return (users);
    });
}
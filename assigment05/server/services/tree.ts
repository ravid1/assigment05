import DB from '../db/db';
import Tree from '../model/tree'

export function getTree() {
    const db = new DB();
    const tree = new Tree();
    return new Promise(async (resolve, reject) => {
        /*const tree = await db.getTree().then((value) => (
            resolve(value)
        ));*/
        Tree.buildTree().then(value =>{
            resolve(value)
        });
    });
}
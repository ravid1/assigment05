export class Api{
    // static baseUrl = '/';
    constructor(){
        /*Api.getUsers().then(value => (
            console.log(value)
        ));*/
    }
    /*static getTranslate() {
        return this.get('/translate/languages');
    }*/

    static getUsers(){
        return this.get('/users');
    }

    static createUser(user: any){
        return this.post('/users',user);
    }

    static deleteUser(user: any){
        return this.delete('/users',user);
    }

    static updateUser(user: any){
        return this.update('/users',user);
    }

    static getGroups(){
        return this.get('/groups');
    }

    static createGroup(obj: Object){
        return this.post('/groups',obj);
    }

    static deleteGroup(id: any){
        return this.delete('/groups',id);
    }

    static addUserToGroup(obj: Object){
        return this.post('/groups/user',obj);
    }

    static getTree() {
        return this.get('/tree');
    }

    static get(url: string) {
        const x = fetch(url).then(res => res.json());
        return x;
    }

    static post(url: string, body: any) {
        const x = fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return x;
    }

    static delete(url: string, body: any) {
        return fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'content-Type': 'application/json'
            }
        }).then((res) => (
            res.json()
        ));
    }

    static update(url: string , body: any) {
        return fetch(url, {
           method: 'PUT',
           body: JSON.stringify(body),
           headers: {
               'content-type': 'application/json'
           }
        }).then(res =>res.json());
    }
}


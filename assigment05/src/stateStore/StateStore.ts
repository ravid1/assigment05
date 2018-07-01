import {Api} from "../Api";

interface IStateStore {
    state: {};
}

class StateStoreService {
    listeners: Function[] =[];

    constructor(){
        this.init();
    }

    init(){
        console.log("init");
        StateStore.getInstance()['showLogin'] = false;
        StateStore.getInstance()['user'] = null;

        Api.getTree().then((tree) => {
            console.log('tree here');
            StateStore.getInstance()['tree'] = tree;
        });
        Api.getUsers().then((users) => {
            StateStore.getInstance()['users'] = users;
        });
        Api.getGroups().then((groups) => {
            StateStore.getInstance()['groups'] = groups;
            this.onStoreChanged();
        });
    }

    public set(key: string, val: any) {
        StateStore.getInstance()[key] = val;
        this.onStoreChanged();
    }

    public get(key: string) {
        return StateStore.getInstance()[key] || null;
    }
    public subscribe(listener:Function){
        this.listeners.push(listener);
    }

    private onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }
    /*================================================= API========================================*/
    public async getTree(){
        const tree = this.get('tree');//= await Api.getTree().then(value => {return value});
        return tree;
    }
}

class StateStore implements IStateStore{
    state: {};
    static instance: IStateStore;
    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }
}

// export default StateStore;

export const stateStoreService = new StateStoreService();
const element = `[
        {
            "type": "group",
            "name": "Friends",
            "messages": [{"time": "10:00", "message": "msg1", "sender": "ravid"},{"time": "10:02", "message": "msg2", "sender": "orel"},{"time": "10:05", "message": "msg3", "sender": "ravid"}],
            "items": [
                {
                    "type": "group",
                    "name": "Best Friends",
                    "messages": [],
                    "items": [
                        {
                            "type": "user",
                            "name": "Tommy",
                            "messages": []
                        }
                    ]
                },
                {
                    "type": "user",
                    "name": "Udi",
                    "messages": []
                }
            ]
        },
            {
                "type": "user",
                "name": "Ori",
                "messages": []
            },
            {
                "type": "user",
                "name": "Roni",
                "messages": []
            }
        ]    `;
stateStoreService.set('tree',JSON.parse(element));
// stateStoreService.set('showLogin',false);
// stateStoreService.set('user',null);


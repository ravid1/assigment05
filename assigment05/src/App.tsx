import * as React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel';
import Users from './components/Users';
import RightPanel from './containers/rightPanel';
import {stateStoreService} from './stateStore/StateStore';
import NavBar from './navbar';
import {Route, Redirect , Switch} from 'react-router-dom'
import  App2 from "./App2";
import {Api} from './Api';
import Groups from "./components/Groups";
import Iuser from "./interfaces/Iuser";

/*interface IappProps {
    loggedInUser: string | null;
}*/

interface AppState{
    update: boolean
    tree: any
}

class App extends React.Component<{} ,AppState> {

    constructor(props: any){
        super(props);
        // stateStoreService.set('user',this.props.loggedInUser);

        stateStoreService.subscribe(()=>{
            this.forceUpdate();
        });
        // Api.getUsers().then((users) => {
        //     stateStoreService.set('users',users);
        // });
        //
        // Api.getGroups().then((groups) => {
        //     stateStoreService.set('groups',groups);
        // });

        this.state = {
            tree: stateStoreService.getTree().then(value => {return value}),
            update: false
        }
    }
    //============================================ USER FUNCTIONS ======================================================

    onUserCreateHandler = (user: any)=> {
        Api.createUser(user)
            .then((newUsersList) => {
                console.log(newUsersList);
                stateStoreService.set('users',newUsersList);
            });
    }

    onUserUpdateHandler = (user: Iuser)=>{
        Api.updateUser(user)
            .then((newUsersList)=>{
                console.log(newUsersList);
                stateStoreService.set('users',newUsersList);
            });
    }

    onUserDeleteHandler = (user: any)=>{
        Api.deleteUser(user)
            .then((newUsersList)=>{
                stateStoreService.set('users',newUsersList);
            });
    }

    //============================================ GROUP FUNCTIONS ======================================================


    createGroupHandler =(group: Object)=>{
        Api.createGroup(group).then((newGroupList) =>{
            Api.getTree().then((tree)=>{
                stateStoreService.set('groups',newGroupList);
                stateStoreService.set('tree',tree);
            });
        });
    }

    addUserToGroupHandler =(obj: Object)=>{
        Api.addUserToGroup(obj).then((value) => {
            Api.getTree().then((tree)=>{
                stateStoreService.set('groups',value);
                stateStoreService.set('tree',tree);
            });
        });
    }

    deleteGroupHandler =(id: any)=>{
        Api.deleteGroup(id).then((newGroupList)=> {
            Api.getTree().then((tree)=>{
                stateStoreService.set('tree',tree);
                stateStoreService.set('groups',newGroupList);
            });
        });
    }

    //====================================================================================================================

    public login = ():any =>(
        stateStoreService.get('showLogin') ? <App2 />:<Redirect to={{pathname:'/tree'}} />
    )

    public tree = ()=>(
        <div className="App">
            <LeftPanel user={stateStoreService.get('user')} tree={stateStoreService.get('tree')}/>
            <RightPanel />
        </div>
    )

    public users = ()=>(
        <Users usersList={stateStoreService.get('users')} user="sasa" onUserCreateHandler={this.onUserCreateHandler} onUserUpdateHandler={this.onUserUpdateHandler} onUserDeleteHandler={this.onUserDeleteHandler}/>
    )

    public groups = ()=>(
        <Groups groups={stateStoreService.get('groups')} users={stateStoreService.get('users')} createGroupHandler={this.createGroupHandler} addUserToGroupHandler={this.addUserToGroupHandler} deleteGroupHandler={this.deleteGroupHandler} />
    )

    public render() {
        console.log('App render');
        return(
            <div>
                <NavBar />
                <Route path='/login' render={this.login} />
                <Switch>
                    <Route path="/users" render={this.users} />
                    <Route path="/groups" render={this.groups} />
                    <Route path="/tree" render={this.tree}/>
                    <Route path="/" render={this.tree}/>
                </Switch>
            </div>
        );
    }
}

export default App;

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

/*interface IappProps {
    loggedInUser: string | null;
}*/

interface AppState{
    tree: any
}

class App extends React.Component<{} ,AppState> {

     constructor(props: any){
        super(props);
         // stateStoreService.set('user',this.props.loggedInUser);

         stateStoreService.subscribe(()=>{
             this.forceUpdate();
         });
         Api.getUsers().then((value) => {
             stateStoreService.set('users',value);
         });

         this.state = {
             tree: "sasa" //stateStoreService.getTree().then(value => {return value})
         }
     }

    public login = ():any =>(
        stateStoreService.get('showLogin') ? <App2 />:<Redirect to={{pathname:'/tree'}} />
    )

    public tree = ()=>(
        <div className="App">
            <LeftPanel user={stateStoreService.get('user')}/>
            <RightPanel />
        </div>
    )

    public render() {
        return(
            <div>
                <NavBar />
                <Route path='/login' render={this.login} />
                <Switch>
                    <Route path="/users" component={Users}  />
                    <Route path="/groups" component={Groups}  />
                    <Route path="/tree" render={this.tree}/>
                    <Route path="/" render={this.tree}/>
                </Switch>
            </div>
        );
    }
}

export default App;

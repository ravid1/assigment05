import * as React from 'react';
import Iuser from "../interfaces/Iuser";
import PopUp from "./pupUp";
// import {stateStoreService} from "../stateStore/StateStore";
// import {Api} from "../Api";


interface Iusers {
    user: string
    usersList: Iuser[]
    onUserCreateHandler: (user:any)=> void
    onUserUpdateHandler: (user: Iuser)=> void
    onUserDeleteHandler: (user: any)=> void
}

interface IusersState{
    users: Iuser[]
    user: Iuser | null
    createPopUp: boolean
    updatePopUp: boolean
}

class Users extends React.Component<Iusers,IusersState>{

    constructor(props: any){
        super(props);

        this.state = {
            users: this.props.usersList,
            user: null,
            createPopUp: false,
            updatePopUp: false
        }
    }

    toggleCreatePopUp = ()=>{
        this.setState((prevState)=>({
           createPopUp: !prevState.createPopUp
        }));
    }

    toggleUpdatePopUp =(user: any)=>{
        this.setState((prevState)=>({
            user: user, //? user : null,
            updatePopUp: !prevState.updatePopUp
        }));
        console.log(user);
    }

    onUserCreateHandler =(user: any)=>{
        /*Api.createUser(user)
            .then((newUser)=>{
                console.log(newUser);

                this.setState((prevState => ({
                    users: [...prevState.users, newUser]
                })));
            });*/
        this.props.onUserCreateHandler(user);
    }

    onUserUpdateHandler =(user: Iuser)=>{
        /*Api.updateUser(user)
            .then(async (updatedUser) => {
               console.log(updatedUser);
               let index = await this.getIndex(updatedUser.id);
               this.setState((prevState) =>({
                   users: prevState.users.slice(0,index).concat(updatedUser).concat(prevState.users.slice(index+1,prevState.users.length)),
                   user: null
               }));
            });*/
        this.props.onUserUpdateHandler(user);
    }

    onUserDeleteHandler =(user: any): any => {
        /*console.log(user);
        Api.deleteUser(user)
            .then(async (deletedUser) => {
                console.log(deletedUser);
                let index = await this.getIndex(deletedUser.id);
                console.log(index);
                this.setState((prevState) => ({
                    users: prevState.users.slice(0,index).concat(prevState.users.slice(index+1,prevState.users.length))
                }));
            });*/
        this.props.onUserDeleteHandler(user);
    }

    getIndex(id: any): any{
        return new Promise( (resolve) => {
            this.state.users.forEach((value, i )=>{
                if(value.id==id){
                    console.log(i);
                    resolve(i);
                }
            });
        });

    }

    public render (){
        console.log('Users render');
        return(
            <>
                <button onClick={this.toggleCreatePopUp}>Create New User</button>
                <ul>
                    {this.props.usersList.map(user=>(<li key={user.id}>{user.id}:{user.name} -- {user.age.toString()}<button onClick={this.toggleUpdatePopUp.bind(this,user)}>Update</button><button onClick={this.onUserDeleteHandler.bind(this,user)}>Delete</button></li>))}
                </ul>
                {this.state.createPopUp ?<PopUp togglePopUp={this.toggleCreatePopUp} onSubmitHandler={this.onUserCreateHandler} text="Create User" /> : null}
                {this.state.updatePopUp ?<PopUp togglePopUp={this.toggleUpdatePopUp} onSubmitHandler={this.onUserUpdateHandler} text="Update User" user={this.state.user} /> : null}
            </>
        )
    }
}

export default Users;
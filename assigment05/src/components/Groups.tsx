import * as React from "react";
// import {stateStoreService} from "../stateStore/StateStore";
import Field from "src/components/Field";
// import {Api} from "../Api";

interface groupsState{
    newGroup: {name: string, parentId: any }
    groupId: any
    createGroup: boolean
    addUser: boolean
}

interface groupProps{
    groups: any[]
    users: any[]
    createGroupHandler: (group: Object)=>void
    addUserToGroupHandler: (obj: Object)=>void
    deleteGroupHandler: (id: any)=>void
}

class Groups extends React.Component<groupProps,groupsState>{

    constructor(props:any){
        super(props);
        this.state = {
            newGroup: {name:"", parentId: 0},
            groupId: 0,
            createGroup: false,
            addUser: false
        }
    }

    onAddGroupHandler = (id:any):any =>{
        this.setState((prevState)=>{
            return{
                createGroup: !prevState.createGroup,
                newGroup: {
                    ...prevState.newGroup,
                    parentId:id
                }
            }
        });
    }

    onCreateGroupHandler = ()=>{
        const obj = {...this.state.newGroup};
        this.props.createGroupHandler(obj);
        this.setState((prevState)=>({
            addUser: !prevState.addUser
        }));
    }

    onAddUserHandler = (id: any)=>{
        this.setState((prevState)=>({
            addUser: !prevState.addUser,
            groupId: id
        }))
    }

    updateField = (fieldName: any, value: any):any => {
        this.setState((prevState) => {
            return {
                newGroup: {
                    ...prevState.newGroup,
                    [fieldName]: value
                }
            }
        })
    };

    createNewGroupRender = ()=>{
        return (
            <>
                <h4>Create New Group</h4>
                <Field name={'name'} type={'text'} onChange={this.updateField}/>
                <button onClick={this.onCreateGroupHandler}>Create New Group</button>
                <br/>
            </>
        )
    }

    getGroups = ():any[]=> {
        return this.props.groups.map(group => (
            <li key={group.id}>
                <button onClick={this.props.deleteGroupHandler.bind(this,group.id)}><i className="fa fa-trash" >s</i></button>
                {group.name}--
                {group.type=="containing groups" || group.type=="empty group" ? <button onClick={this.onAddGroupHandler.bind(this,group.id)}>Add New Group</button> : null}
                {group.type=="containing users" || group.type=="empty group" ? <button onClick={this.onAddUserHandler.bind(this,group.id)} >Add New User</button> : null}
            </li>
        ));
    }

    usersPopUp = ()=>{
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <h2>CHOOSE USER</h2>
                    <ul>
                        {this.props.users.map((user) => ( <li key={user.id}>{user.name}--{user.age}<button onClick={this.selectUserHandler.bind(this,user.id)}>Select User</button></li>))}
                    </ul>
                </div>
            </div>
        )
    }

    selectUserHandler =(userId:any)=>{
        const object = {userId: userId, groupId:this.state.groupId};
        this.props.addUserToGroupHandler(object);
        this.setState((prevState)=>({
            addUser: !prevState.addUser
        }));
    }

    public render(){

        const groupList = this.getGroups();

        return(
            <>
                {this.state.createGroup ? this.createNewGroupRender() : null}
                {this.state.addUser ? this.usersPopUp() : null}
                <h4>Group List:</h4>
                <ul>{groupList}</ul>
            </>
        )
    }
}

export default Groups
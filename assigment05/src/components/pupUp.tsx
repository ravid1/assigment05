import * as React from "react";
import Field from "./Field";
import '../css/popUp.css';
import Iuser from "../interfaces/Iuser";

interface IpopUpProps {
    togglePopUp: any
    onSubmitHandler: any
    text: string
    user?: any
}

interface IpopUpState {
    user: Iuser
}

class PopUp extends React.Component<IpopUpProps,IpopUpState>{

    constructor(props: any){
        super(props);
        this.state={
            user: {
                name: "",
                age: 0
            }
        }
    }

    submitUser = ()=>{
        this.props.onSubmitHandler(this.state.user);
        this.props.togglePopUp();
    }

    updateField = (fieldName: any, value: any) => {
        this.setState((prevState) => {
            return {
                user: {
                    id: this.props.user ? this.props.user.id : null,
                    ...this.state.user,
                    [fieldName]: value
                }
            }
        })
    };

    public render(){
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <h2>{this.props.text}</h2>
                    <form>
                        <Field name={'name'} type={'text'} onChange={this.updateField}/>
                        <Field name={'age'} type={'number'} onChange={this.updateField}/>
                        <button type="button" onClick={this.submitUser}>submit</button>
                        <button onClick={this.props.togglePopUp}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default PopUp;
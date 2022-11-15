import {Component} from "react";
import './Register.css';
import FormInput from '../../components/Form/FormInput'
import FormButton from '../../components/Form/FormButton'
import register_img_src from './register.svg';
import { useNavigate  } from 'react-router-dom';
import { withNavigation } from 'react-navigation';

class Register extends Component {
    state = {
        msg : '',
        status : '',
        isFetching : false,

    }
    onInputChange  = (childData) => {
        this.state[childData.name] = childData.value;
    }
    on
    childCallBack = (childData) => {

        const navigate = useNavigate();
        navigate('/');
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const form_data = {first_name , last_name , username , email , password};
        this.setState({isFetching : true});
        fetch(`http://localhost:5000/register`, {
            method:'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_data)
        }).then((response)=>{
            this.setState({status : response.status});
            return response.json();}
        ).then((data)=>{
            this.setState({msg : data.msg});
        })
        .then(()=>(this.setState({isFetching : false})))
    }

    render()  {
        const msg = this.state.msg;
        const status = this.state.status;
        const isFetching = this.state.isFetching;
        return(
            <div>
                { msg }
                <div  className="p-6 max-w-sm mx-auto bg-zinc-200 rounded-xl shadow-xl">
                    <img className="w-48 h-32" src={register_img_src} alt="Registration SVG" />
                    <FormInput onInputChange={this.onInputChange} type="email" label="Email" name="email" placeholder="enter email..." />
                    <FormInput onInputChange={this.onInputChange} type="text" label="First Name" name="first_name" placeholder="enter First Name..." />
                    <FormInput onInputChange={this.onInputChange} type="text" label="Last Name" name="last_name" placeholder="enter Last Name..." />
                    <FormInput onInputChange={this.onInputChange} type="text" label="Username" name="username" placeholder="enter Username..." />
                    <FormInput onInputChange={this.onInputChange} type="password" label="Password" name="password" placeholder="enter Password..." />
                    <FormButton childCallBack={this.childCallBack} value="Register" isFetching={isFetching} />
                </div>
            </div>
        )
    }
}



export default Register;
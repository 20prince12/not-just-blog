import  { useState } from "react";
import FormInput from '../../components/Form/FormInput'
import FormButton from '../../components/Form/FormButton'
import register_img_src from './register.svg';


const Register = () => {
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState('');
    const [isFetching, setIsFetching] = useState('');
    const [formData, setFormData] = useState({first_name:'',last_name:'',username:'',email:'',password:''})

    const updateInputData  = (childData) => {
        setFormData({...formData, [childData.name] : childData.value});
    }

    const submit = () => {
        setIsFetching(true);
        fetch(`http://localhost:5000/register`, {
            method:'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }).then((response)=>{
            setStatus(response.status);
            return response.json();}
        ).then((data)=>{
            setMsg(data.msg);
        })
        .then(()=>(setIsFetching(false)))
    }
        return(
            <div>
                { msg }
                <div  className="p-6 max-w-sm mx-auto bg-zinc-200 rounded-xl shadow-xl">
                    <img className="w-48 h-32" src={register_img_src} alt="Registration SVG" />
                    <FormInput parentCallBack={updateInputData} type="email" label="Email" name="email" placeholder="enter email..." />
                    <FormInput parentCallBack={updateInputData} type="text" label="First Name" name="first_name" placeholder="enter First Name..." />
                    <FormInput parentCallBack={updateInputData} type="text" label="Last Name" name="last_name" placeholder="enter Last Name..." />
                    <FormInput parentCallBack={updateInputData} type="text" label="Username" name="username" placeholder="enter Username..." />
                    <FormInput parentCallBack={updateInputData} type="password" label="Password" name="password" placeholder="enter Password..." />
                    <FormButton parentCallBack={submit} value="Register" isFetching={isFetching} />
                </div>
            </div>
        )
}



export default Register;
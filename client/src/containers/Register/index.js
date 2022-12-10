import {useEffect, useState} from "react";
import FormInput from '../../components/Form/FormInput'
import FormButton from '../../components/Form/FormButton'
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {UserContext} from "../../context/UserContext";
import {useContext} from "react";


const Register = () => {
    const [msg, setMsg] = useState('');
    const [IsFetching, setIsFetching] = useState(false);
    const [formData, setFormData] = useState({first_name:'',last_name:'',username:'',email:'',password:''})
    const {setCustomMsg} = useContext(UserContext);
    const navigate = useNavigate();

    const updateInputData  = (childData) => {
        setFormData({...formData, [childData.name] : childData.value});
    }

    useEffect(() => {
        document.title = "register";
    },[]);

    const submit = () => {
        setIsFetching(true);
        api.post(`/register`, formData)
            .then((response) => {
                if (response.status === 200) navigate('/login');
                else setMsg(response.data.msg);
            }).then(()=>{
                setIsFetching(false);
                setCustomMsg({value:'Successfully Registered, Please login',type:'success'});
        })
            .catch(()=>setIsFetching(false));
    }
        return(
            <div>
                { msg }
                <div className=" justify-self-center ml-52 flex-col m-2 my-10 p-8  bg-gray-100 dark:bg-gray-600 rounded-md shadow-xl">
                    <FormInput validate='true' parentCallBack={updateInputData} type="email" label="Email" name="email"/>
                    <FormInput validate='true' parentCallBack={updateInputData} type="text" label="First Name" name="first_name" />
                    <FormInput validate='true' parentCallBack={updateInputData} type="text" label="Last Name" name="last_name" />
                    <FormInput validate='true' parentCallBack={updateInputData} type="text" label="Username" name="username"/>
                    <FormInput validate='true' parentCallBack={updateInputData} type="password" label="Password" name="password" />
                    <FormButton validate='true' parentCallBack={submit} value="Register" isFetching={IsFetching} />
                </div>
            </div>
        )
}



export default Register;
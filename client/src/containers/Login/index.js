import  { useState } from "react";
import FormInput from '../../components/Form/FormInput'
import FormButton from '../../components/Form/FormButton'
import { useNavigate } from 'react-router-dom';
import server from '../../utils/server';


const Login = () => {
    const [msg, setMsg] = useState('');
    const [isFetching, setIsFetching] = useState('');
    const [formData, setFormData] = useState({username:'',password:''})
    const navigate = useNavigate();

    const updateInputData  = (childData) => {
        setFormData({...formData, [childData.name] : childData.value});
    }

    const submit = () => {
        setIsFetching(true);
        server.post(`/login`,  formData).then((response)=> {
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.authToken);
                navigate('/');
            } else setMsg(response.data.msg);
        })
        setIsFetching(false)
    }
    return(
        <div>
            { msg }
            <div  className="p-6 max-w-sm mx-auto bg-zinc-200 rounded-xl shadow-xl">
                <FormInput validate="false" parentCallBack={updateInputData} type="text" label="Username" name="username" placeholder="enter Username..." />
                <FormInput validate="false" parentCallBack={updateInputData} type="password" label="Password" name="password" placeholder="enter Password..." />
                <FormButton parentCallBack={submit} value="Login" isFetching={isFetching} />
            </div>
        </div>
    )
}



export default Login;
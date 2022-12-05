import {useContext, useEffect, useState} from "react";
import FormInput from '../../components/Form/FormInput'
import FormButton from '../../components/Form/FormButton'
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {UserContext} from "../../context/UserContext";


const Login = () => {
    const [IsFetching, setIsFetching] = useState('');
    const [formData, setFormData] = useState({username:'',password:''})
    const navigate = useNavigate();
    const {setIsLoggedIn, CustomMsg, setCustomMsg} = useContext(UserContext);
    const [msg, setMsg] = useState(CustomMsg);

    useEffect(()=>{
        document.title = "login";
        setCustomMsg({});
    },[])

    const displayMsg = {
         'fail' : <div
            className="bg-red-200 dark:bg-red-100 rounded-sm py-2 px-2 mb-3 text-base dark:text-red-500 text-red-900 inline-flex items-center w-full"
            role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle"
                 className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
            {msg.value}
        </div>

         ,'success' : <div
            className="bg-green-200 dark:bg-green-50 rounded-sm py-2 px-2 mb-3 text-base dark:text-green-600 text-green-900 inline-flex items-center w-full"
            role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle"
                 className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
            {msg.value}
        </div>

    }

    const updateInputData  = (childData) => {
        setFormData({...formData, [childData.name] : childData.value});
    }

    const submit = () => {
        setIsFetching(true);
        api.post(`/login`,  formData).then((response)=> {
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.authToken);
                setIsLoggedIn(true);
                navigate('/Home');
            } else setMsg({value:response.data.msg, type:'fail'});
        }).then(()=>setIsFetching(false))
        .catch(()=>setIsFetching(false));

    }
    return(
        <div>
            <div  className=" ml-52 flex-col m-2 my-10 p-8 w-full bg-gray-100 dark:bg-gray-600 rounded-md shadow-xl">
                {msg.value && displayMsg[msg.type]}
                <FormInput parentCallBack={updateInputData} type="text" label="Username" name="username" placeholder="enter Username..." />
                <FormInput parentCallBack={updateInputData} type="password" label="Password" name="password" placeholder="enter Password..." />
                <FormButton parentCallBack={submit} value="Login" isFetching={IsFetching} />
            </div>
        </div>
    )
}



export default Login;
import  { useState } from "react";
import Validate_Form from '../../utils/Validate_Form';


const FormInput = (props) => {
    const [errors, setErrors] = useState([]);
    const [InputColor, setInputColor] = useState('');

    const changeInput = async (event)=>{
        const name = event.target.name
        const value = event.target.value
        const errors = props.validate==="false"?[]:await Validate_Form(name , value);
        setErrors(errors);
        setInputColor(errors.length?'red':'green');
        props.parentCallBack({name : name , value : value});
    }

    return(
        <div>
            <label className="flex mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700">{props.label}</span>
            </label>
            <input onChange={changeInput} required type={props.type} name={props.name}
                   className={`bg-${InputColor}-50 border-${InputColor}-500 text-${InputColor}-800 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1`}
                   placeholder={props.placeholder}/>
            {errors.map(
                (error)=> <span className="text-xs text-red-700">{error}<br/></span>
            )}
        </div>
    )
}
export default FormInput;
import  { useState } from "react";
import Validate_Form from '../../utils/Validate_Form';


const FormInput = (props) => {
    const [errors, setErrors] = useState([]);
    const [InputColor, setInputColor] = useState('default');

    const errorClass = {
        'default' : 'dark:focus:border-cyan-200 focus:border-cyan-600 dark:border-gray-200 dark:text-white text-gray-900'
        ,'invalid' : 'dark:focus:border-red-500 dark:border-red-500 border-red-800 focus:border-red-800 dark:text-red-500 text-red-800'
        ,'valid'   : 'dark:focus:border-green-500 dark:border-green-500 border-green-800 focus:border-green-800 dark:text-green-500 text-green-800'
    }

    const changeInput = async (event)=>{
        const name = event.target.name
        const value = event.target.value
        if(props.validate==="true") {
            const errors = await Validate_Form(name, value);
            setErrors(errors);
            setInputColor(errors.length ? 'invalid' : 'valid');
        }
        props.parentCallBack({name : name , value : value});
    }

    return(
        <div>
            <div className="relative z-0 mb-6 w-full group">
                <input onChange={changeInput}  type={props.type} required name="floating_email" id="floating_email" name={props.name}
                       className={`${errorClass[InputColor]} border-gray-300 block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0  peer`}
                       placeholder=" " required/>
                <label htmlFor="floating_email"
                       className="font-semibold peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 dark:peer-focus:text-cyan-200  peer-focus:text-cyan-600 peer-focus:dark:text-cyan-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {props.label}</label>
                {errors.map(
                    (error)=> <span className="text-xs dark:text-red-300 text-red-800">{error}<br/></span>
                )}
            </div>
        </div>
    )
}
export default FormInput;
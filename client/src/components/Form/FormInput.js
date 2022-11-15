import {Component} from "react";
import Validate_Form from '../../utils/Validate_Form';



class FormInput extends Component {
    state = {
        errors : [],
    }

    onChange =async (event)=>{
        const name = event.target.name
        const value = event.target.value
        const errors = await Validate_Form(name , value)
        this.setState({errors : errors });
        this.setState({currClass : errors.length===0?"bg-green-50 border-green-500 text-green-800":"bg-red-50 border-red-500  text-red-800" });
        this.props.onInputChange({name : name , value : value});
    }

    render() {
        return(
            <div>
                <label className="flex mt-5">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-slate-700">{this.props.label}</span>
                </label>
                <input onBlur={this.onBlur} onChange={this.onChange} required type={this.props.type} name={this.props.name}
                       className={this.state.currClass+" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"}
                       placeholder={this.props.placeholder}/>
                {this.state.errors.map(
                    (error)=> <span className="text-xs text-red-700">{error}</span>
                )}
            </div>
        )
    }
}
export default FormInput;
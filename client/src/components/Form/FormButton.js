import {Component} from "react";
import Loader from "../Loader"

class FormButton extends Component {

    childCallBack =(event)=>{
        this.props.childCallBack();
    }

    render() {
        return(<div>
            <button onClick={this.childCallBack} className="bg-white flex ml-24 mt-10 px-4 py-1 text-xl text-purple-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                { this.props.isFetching===true && <Loader/> }
                { this.props.value}
            </button>
            </div>

        )
    }
}
export default FormButton;
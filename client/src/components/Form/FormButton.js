import Loader from "../Loader";


const FormButton = (props)=> {
    return(
        <div>
            <button onClick={props.parentCallBack} className="dark:bg-gray-800 bg-white flex px-4 py-1 text-xl dark:text-gray-100 text-gray-700 font-semibold rounded-sm  dark:hover:text-gray-600 hover:text-gray-200 hover:text-gray-700 dark:hover:bg-cyan-200 hover:bg-cyan-600 hover:border-transparent focus:ring-cyan-600 dark:focus:ring-cyan-200 focus:ring-offset-2">
                { props.isFetching===true && <Loader/> }
                { props.value}
            </button>
        </div>
    )
}
export default FormButton;
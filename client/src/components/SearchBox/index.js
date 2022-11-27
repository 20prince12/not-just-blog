import {UserContext} from "../../context/UserContext";
import {useContext} from "react";

const SearchBox = (props) => {
    const { theme } = useContext(UserContext);
    const onSearch = (event) => {
        props.onSearch(event.target.value);
    }

    const Svg = {
        microphone_dark : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
        </svg>
        ,microphone_light :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
    }
        return (
                <div className="sticky top-0  mx-auto inset-x-0 z-10 rounded-lg overflow-hidden md:max-w-xl ">
                    <div className="md:flex">
                        <div className="w-full p-3">
                            <div className="relative dark:text-white text-black">
                                <i className="absolute fa fa-search top-4 left-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                    </svg>
                                </i>
                                <input onChange={onSearch} type="text"
                                       className="bg-gray-100 dark:bg-gray-600 h-14 w-full px-12 rounded-lg focus:outline-none"
                                       name="" />
                                    <span className="absolute top-4 right-4 border-l pl-4 dark:hover:text-cyan-300 hover:text-cyan-700 hover:cursor-pointer">
                                    {Svg[`microphone_${theme}`]}
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
        )
 }
export default SearchBox;
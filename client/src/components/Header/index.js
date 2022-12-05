import { UserContext } from "../../context/UserContext";
import {useContext} from "react";
import SearchBox from "../SearchBox";
import logo from './logo192.png';

const Header = props => {
    const {setSearch } = useContext(UserContext);

    const onSearch =(value)=>{
        setSearch(value);
    }

    return (
        <div className="grid grid-cols-4 backdrop-blur-sm   bg-gray-200/75 dark:bg-gray-700/75 sticky top-0 z-10 col-span-6  shadow-sm">
            <div className="cursor-pointer inline-flex space-x-2 self-center ml-10">
            <img className="h-10" src={logo} />
             <h1 className="self-center">NOT JUST BLOG</h1>
            </div>
            <SearchBox onSearch = {onSearch} />
        </div>
    )
}

export default Header;
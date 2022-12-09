import { UserContext } from "../../context/UserContext";
import {useContext} from "react";
import SearchBox from "../SearchBox";
import logo from './logo192.png';
import ThemeSwitch from '../ThemeSwitch'

const Header = props => {
    const {setSearch } = useContext(UserContext);

    const onSearch =(value)=>{
        setSearch(value);
    }

    return (
        <div className="flex backdrop-blur-sm  space-x-5 mx-5 bg-gray-200/75 dark:bg-gray-800/75 sticky top-0 z-10 shadow-sm">
            <div className="cursor-pointer inline-flex space-x-2 self-center">
                <img className="h-10" src={logo} />
            </div>
            <SearchBox onSearch = {onSearch} />
            <ThemeSwitch />
        </div>
    )
}

export default Header;
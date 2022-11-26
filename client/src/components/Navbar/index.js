import NavItem from "./NavItem";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

const Navbar = props => {

    const {IsLoggedIn} = useContext(UserContext);

    const navItems = IsLoggedIn
        ? [{svg : 'profile' , route : '/Profile' }
            ,{svg : 'home' , route : '/' }
            ,{svg : 'message' , route : '/Message' }
            ,{svg : 'logout' , route : '/Logout' }
            ]
        :[{svg : 'register' , route : '/Register' },{svg : 'login' , route : '/Login' }];

    return (
        <div className="flex justify-center">
            <aside
                className="shadow-xl fixed rounded-3xl space-x-2  bottom-5 flex flex-row justify-center dark:bg-gray-800 bg-gray-100 text-black items-center px-4 py-2">
                {navItems.map((item)=><NavItem svg={item.svg} route={item.route} key={item.svg}/>) }
            </aside>
        </div>
    )
}
export default Navbar;
import NavItem from "./NavItem";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

const Navbar = props => {

    const {IsLoggedIn } = useContext(UserContext);



    const navItems = IsLoggedIn
        ? [{svg : 'profile' , route : '/Profile' }
            ,{svg : 'home' , route : '/Home' }
            ,{svg : 'message' , route : '/Message' }
            ,{svg : 'logout' , route : '/Logout' }
            ]
        :[{svg : 'register' , route : '/Register' },{svg : 'login' , route : '/Login' }];

    return (
            <nav className="fixed left-0 h-screen py-3 px-5">
                {navItems.map((item)=><NavItem svg={item.svg} route={item.route} key={item.svg}/>) }
            </nav>
    )
}
export default Navbar;
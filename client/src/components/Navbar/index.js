import NavItem from "./NavItem";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

const Navbar = props => {

    const {IsLoggedIn,theme , setTheme } = useContext(UserContext);

    const svg = {
        "light" : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>

        ,"dark" :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>

    }


    const themeSwitch = ()=>{
        if(document.documentElement.classList.contains("dark")){
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme","light");
            setTheme("light");
        }
        else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme","dark");
            setTheme("dark");
        }
    }

    const navItems = IsLoggedIn
        ? [{svg : 'profile' , route : '/Profile' }
            ,{svg : 'home' , route : '/Home' }
            ,{svg : 'message' , route : '/Message' }
            ,{svg : 'logout' , route : '/Logout' }
            ]
        :[{svg : 'register' , route : '/Register' },{svg : 'login' , route : '/Login' }];

    return (
            <nav className="w-44 fixed left-0 h-screen p-6">
                {navItems.map((item)=><NavItem svg={item.svg} route={item.route} key={item.svg}/>) }
                <div onClick={themeSwitch} className="hover:dark:text-white dark:bg-gray-100 dark:text-gray-800 dark:text-black bg-gray-800 text-white drop-shadow-xl rounded-2xl  h-10 w-10 flex items-center justify-center cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 dark:hover:bg-gray-800 hover:ease-linear dark:focus:bg-gray-800 focus:bg-white">
                    {svg[theme]}
                </div>
            </nav>
    )
}
export default Navbar;
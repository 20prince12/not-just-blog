import { createContext,useState } from "react";

export const UserContext = createContext();
export const UserContextWrapper  = (props) =>{

    const [theme, setTheme] = useState(localStorage.getItem('theme') ||  window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light' );
    const [IsLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('authToken') || false);
    const [CustomMsg, setCustomMsg] = useState({});

    const state = {
         theme
        ,setTheme
        ,IsLoggedIn
        ,setIsLoggedIn
        ,CustomMsg
        ,setCustomMsg
    }

    return (
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    )
}
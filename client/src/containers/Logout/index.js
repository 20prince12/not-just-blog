import { useNavigate } from 'react-router-dom';
import {UserContext} from "../../context/UserContext";
import { useContext } from "react";

const Logout = (props) =>{
    const {setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    navigate('/Login');
    return;
}

export default Logout;
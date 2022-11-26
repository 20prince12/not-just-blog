import React from "react";
import { Routes  , Route } from 'react-router-dom'
import Blog from '../../containers/Blog'
import Register from "../../containers/Register";
import Login from "../../containers/Login";
import Logout from "../../containers/Logout";

const Main = props => (
    <Routes>
        <Route exact path="/" element={<Blog />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Logout" element={<Logout />} />
    </Routes>
)

export default Main
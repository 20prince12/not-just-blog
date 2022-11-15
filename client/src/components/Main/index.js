import React from "react";
import { Routes  , Route } from 'react-router-dom'
import Blog from '../../containers/Blog'
import Register from "../../containers/Register";

const Main = props => (
    <Routes>
        <Route exact path="/" element={<Blog />} />
        <Route exact path="/Register" element={<Register />} />
    </Routes>
)

export default Main
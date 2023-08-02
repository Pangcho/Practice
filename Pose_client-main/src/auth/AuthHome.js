import React from 'react';
import {useSelector} from "react-redux";

import Login from "./Login";
import Home from "../home/Home";

function AuthHome(props) {
    const isAuth=Boolean(useSelector((state)=>state.token))

    return (
        <>
            {
                isAuth?
                    <Home/>
                    :
                    <Login/>
            }
        </>
    );
}

export default AuthHome;

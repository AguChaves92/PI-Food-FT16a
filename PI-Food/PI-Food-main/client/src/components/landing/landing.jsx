import React from "react";
import { NavLink } from "react-router-dom";



export default function landingPage(){

    return (
        <div>
            
        <h1> Welcome</h1>

        <div>
        <NavLink to= "/home">
            <button>Lets cook something</button>
        </NavLink>

        </div>

        </div>

    )


}

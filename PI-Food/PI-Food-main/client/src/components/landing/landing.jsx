import React from "react";
import { NavLink } from "react-router-dom";
import './index.css'

export default function landingPage() {
  return (
    <div className="landing">
    <div className="container">
        <div className="intro">
            <div className="maintitle">Henry</div>  
            <div className="Sub">Good food and great vibes</div>
        </div>
        <NavLink to="/home">
            <button className="btn">
            Grab a Bite
            </button>
        </NavLink>
    </div>
    
</div>
  );
}

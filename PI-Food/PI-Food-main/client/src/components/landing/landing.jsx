import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import './index.css'
import { getRecipes } from "../../actions/index";

export default function LandingPage() {

  const dispatch = useDispatch();

useEffect(() => {
  dispatch(getRecipes());
}, []);

  return (
    <div className="landing">
    <div className="container">
        <div className="intro">
            <div className="maintitle">Foodie</div>  
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

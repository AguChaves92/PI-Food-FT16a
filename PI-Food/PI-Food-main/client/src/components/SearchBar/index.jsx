import React from "react";
import  {getRecipes}  from "../../actions/index";
import { useDispatch} from 'react-redux'
import { useState } from "react";
import './index.css'
function SearchBar (props) {

  const dispatch = useDispatch();

    const [state, setState] = useState("");

    function handleChange(e) {
      setState(e.target.value);//add name to state
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      dispatch(getRecipes(state)) //dispatches state
      setState("");
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
         
          <input
            type="text"
            placeholder="Get recipes"
            value={state}
            onChange={(e) => handleChange(e)}
            className="searchbar"
          />
          <button type="submit" className="sb_btn"> GO </button>
        </form>
      </div>
    );
}



  

export default SearchBar
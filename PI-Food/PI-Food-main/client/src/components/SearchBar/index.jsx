import React from "react";
import { getRecipes } from "../../actions/index";
import { useDispatch} from 'react-redux'
import { useState } from "react";

function SearchBar (props) {

  const dispatch = useDispatch();

    const [state, setState] = useState("");

    function handleChange(e) {
      setState(e.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      dispatch(getRecipes(state))
      setState("");
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label> Get recipes </label>
          <input
            type="text"
            placeholder=" Search"
            value={state}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit"> GO </button>
        </form>
      </div>
    );
}



  

export default SearchBar
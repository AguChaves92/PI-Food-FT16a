import React from "react";
import { sortName, getOrderByScore, filter } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./style.css";

function Sort() {
  const diet = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const [filterDiets, setFilterDiets] = useState("");

  function handleOrderName(e) {
    e.preventDefault();
    
    dispatch(sortName(e.target.value));
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(getOrderByScore(e.target.value));
  }

  function handleFilter(e) {
    console.log(e.target.value)
    if(e.target.value==="RESET"){
      
    }
    setFilterDiets(e.target.value);
    dispatch(filter(e.target.value));
  }

let id=0;

  return (
    <div>
      <div className='sort'>
        <span>
          <h3> Filter by Diet Types</h3>
          <select className="sort_list" onChange={(e) => handleFilter(e)}>
            {diet.map((diet) => (
            
              <option className="sort_option" key={++id} value={diet}>{diet}</option>
            ))}
            <option className="sort_option" key={diet.value} value="RESET">All</option>
          </select>
        </span>
        <span>
          <h3> Alfabeticamente</h3>
          <select className="sort_list" onChange={(e) => handleOrderName(e)}>
            <option className="sort_option" value="RESET">Default</option>
            <option className="sort_option" value="DESC">A-Z</option>
            <option className="sort_option" value="ASC">Z-A</option>
          </select>
        </span>
        <span>
          <h3> Por puntaje</h3>
          <select className="sort_list" onChange={(e) => handleOrderByScore(e)}>
            <option className="sort_option" value="RESET">Default</option>
            <option className="sort_option" value="MAXMIN">Highest to lowest score</option>
            <option className="sort_option" value="MINMAX">Lowest to highest score</option>
          </select>
        </span>
      </div>
    </div>
  );
}

export default Sort;

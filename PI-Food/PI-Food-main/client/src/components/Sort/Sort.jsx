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
    console.log(e.target.value);
    dispatch(sortName(e.target.value));
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(getOrderByScore(e.target.value));
  }

  function handleFilter(e) {
    console.log(e.target.value)
    setFilterDiets(e.target.value);
    dispatch(filter(e.target.value));
  }
  return (
    <div>
      <div>
        <span>
          <h3> Filter by Diet Types</h3>
          <select onChange={(e) => handleFilter(e)}>
            {diet.map((diet) => (
            
              <option value={diet}>{diet}</option>
            ))}
            <option value="RESET">All</option>
          </select>
        </span>
        <span>
          <h3> Alfabeticamente</h3>
          <select onChange={(e) => handleOrderName(e)}>
            <option value="RESET">Default</option>
            <option value="DESC">A-Z</option>
            <option value="ASC">Z-A</option>
          </select>
        </span>
        <span>
          <h3> Por puntaje</h3>
          <select onChange={(e) => handleOrderByScore(e)}>
            <option value="RESET">Default</option>
            <option value="MAXMIN">Highest to lowest score</option>
            <option value="MINMAX">Lowest to highest score</option>
          </select>
        </span>
      </div>
    </div>
  );
}

export default Sort;

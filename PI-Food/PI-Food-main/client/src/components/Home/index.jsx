import React from "react";
import SearchBar from "../../components/SearchBar/index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../cards/cards";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination.jsx";
import Sort from "../Sort/Sort";


import {
  getRecipes,
  getTypes,
  sortName,
  getOrderByScore,
  filter,
} from "../../actions/index";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.recipes);
  const diet = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = state.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [filterDiets, setFilterDiets] = useState("");

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(sortName(e.target.value));
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(getOrderByScore(e.target.value));
  }

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilter(e) {
    setFilterDiets(e.target.value);
    dispatch(filter(e.target.value.toLowerCase()));
  }

  console.log(currentRecipes);
  return (
    <div >
      <h1>FOOD</h1>
      <SearchBar />
      <Link to="/recipe" >
        <button>Add recipe</button>
      </Link>
      <Sort/>
    <Pagination RecipesPerPage={recipesPerPage} totalRecipes={state.length} paginate={paginate}/>

    
        <div>
          <List recipes={currentRecipes} />
        </div>
     
    </div>
  );
}

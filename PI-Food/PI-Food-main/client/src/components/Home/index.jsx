
import SearchBar from "../../components/SearchBar/index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../cards/cards";
import { Link } from "react-router-dom";
  import Pagination from "../Pagination/Pagination.jsx";
import Sort from "../Sort/Sort";
import { getTypes } from "../../actions/index";
import "./style.css";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1); //for pagination
  const [recipesPerPage] = useState(10);//because they fit better
  const indexOfLastRecipe = currentPage * recipesPerPage; 
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = state.slice(indexOfFirstRecipe, indexOfLastRecipe); // determines wich recipes will render 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div className="home_backg">
      <div className="bar">
      <h3 className="slogan">Good food and great vibes</h3>
      </div>
      <SearchBar />
      <Link to="/home/Add">
        <button className="home_add">Add recipe</button>
      </Link>

      <Sort />
      <div>
        <List recipes={currentRecipes} />
      </div>
      <footer className="footer">
      <Pagination
        RecipesPerPage={recipesPerPage}
        totalRecipes={state.length}
        paginate={paginate}
      />

      </footer>

      
    </div>
  );
}

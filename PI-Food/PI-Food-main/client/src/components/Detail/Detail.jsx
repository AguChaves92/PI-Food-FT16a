import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getById } from "../../actions/index";
import "./index.css";
import { Link } from "react-router-dom";
import plate from "../../utils/plate.jpg";

function Detail(props) {
  const recipe = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();

  useEffect(() => { // dispatches action as soon as it loads
    dispatch(getById(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); //to avoid constant reloading

  
  return ( //dispalys info
    <div>
      <Link to="/Home">
        <button className="detail_home">Home</button>
      </Link>
      <h1 className="title">{recipe.title}</h1>
      <img
        className="image"
        src={recipe.image ? recipe.image : plate}
        alt="img plato"
      />

      <div className="columns">
        <div className="column">
          <h3>Summary</h3>
          <p className="summary">
            {recipe.summary
              ? recipe.summary.replace(/<[^>]*>?/g, "")
              : "Loading"}
          </p>
        </div>
        <div className="column">
          <h1 className="midcolumn">Score : {recipe.score}</h1>
          <h1 className="midcolumn">Health Level : {recipe.level}</h1>
          <h1 className="midcolumn">
           Diet Types :
            {typeof recipe.diets !== "undefined" && recipe.diets.length > 0 ? (
              recipe.diets.map((diets) => {
                console.log();
                return <h4 className="Addtypes">{ " "+diets+" " }, </h4>;
              })
            ) : (
              <h2>NONE</h2>
            )}
          </h1>
          <h1 className="midcolumn">
           Dish Types : 
            {typeof recipe.dishTypes !== "undefined" && recipe.dishTypes.length > 0 ? (
              recipe.dishTypes.map((dishTypes) => {
                console.log();
                return <h4 className="Addtypes"> {" "+ dishTypes + " "}, </h4>;
              })
            ) : (
              <h2>NONE</h2>
            )}
          </h1>
        </div>
        <div className="column">
          <h3>Instructions</h3>
          <p className="summary">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;

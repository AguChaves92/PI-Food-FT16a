import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Card({ recipes }) {
  var countId = 0;

  console.log("in cards", recipes);

  recipes.map((r) => {
    console.log(r);
  });

  return (
    <div>
      <ul>
        {recipes.map(function (recipe) {
          return (
            <div>
              <li key={recipe.id}>
                <Link to={`/home/${recipe.id}`}>
                  <img src={recipe.image} />
                </Link>
                <span>{recipe.title ? recipe.title : recipe.name}</span>
                <div>
                  <label>
                    {typeof recipe.diets !== "undefined" &&
                    recipe.diets.length !== 0
                      ? recipe.diets
                          .map((diet) => Object.values(diet))
                          .join(", ")
                          .toLowerCase()
                      : "Not available"}
                  </label>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

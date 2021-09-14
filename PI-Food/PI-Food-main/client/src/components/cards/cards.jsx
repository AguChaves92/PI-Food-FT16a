import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import plate from '../../utils/plate.jpg'

export default function Card({ recipes }) {
  
  let id=0;

  return (
    <div className="list_container">
      <ul>
        {recipes.map(function (recipe) {
          
          return ( //cards. asks if image else puts plate. asks about the type of diet. if its not undefined and has lenght>0, puts them in a label, else puts None
            <div key={++id}>
              <li key={recipe.id}>
                <Link to={'/home/detail/' + recipe.id}> 
                  <img src={recipe.image? recipe.image:plate} alt="not found"/>
                </Link>
                <span>{recipe.title ? recipe.title : recipe.name}</span>
                <div>
                  <label>
                    
                    {typeof recipe.Types !== "undefined" &&
                    recipe.Types.length !== 0
                      ? recipe.Types
                          .map((type) => Object.values(type))
                          .join(", ")
                          .toLowerCase()
                      : "None"}
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

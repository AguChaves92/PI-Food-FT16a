import React from "react";
import "./index.css";

const Pagination = ({ RecipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / RecipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.map((number) => (
        <button className="pag_btn" key={number} onClick={() => paginate(number)}>{number}</button>
      ))}
    </nav>
  );
};

export default Pagination;

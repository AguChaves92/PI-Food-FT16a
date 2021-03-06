import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import { postRecipe, getTypes } from "../../actions/index";

function AddRecipe() {
  const diet = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [input, setInput] = useState({
    //local state
    title: "",
    summary: "",
    score: "",
    level: "",
    instructions: "",

    Types: [],
  });

  function handleChange(e) {
    //sets the input value to the local state property
   
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCheck(e) {
    // adds types
    if (e.target.name === "Types") {
      setInput({ ...input, Types: [...input.Types, e.target.value] });
    } else setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    
    //submits the recipes to the db cleans the form
    e.preventDefault();

    dispatch(postRecipe(input));
    setInput({
      title: "",
      summary: "",
      score: "",
      level: "",
      instructions: "",

      Types: [],
    });
  }

  return (
    <div>
      <div>
        <h1 className="title">Create your own Recipe</h1>
        <Link to="/Home">
          <button className="backbtn">Home</button>
        </Link>
      </div>
     

      <div>
        
        <form className="add_form" onSubmit={handleSubmit}>
          <div className="columnAdd">
        <p>(*) Please fill the required fields </p>
            <div className="items">
              <label>Title: (*)</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={input.title}
                className="inputs"
              />
            </div>
            <div className="items">
              <label>Summary: (*) </label>
              <textarea
                name="summary"
                onChange={(e) => handleChange(e)}
                value={input.summary}
                className="textbox"
              />
            </div>

            <div className="items">
              <label>Score: (*)</label>
              <input
                type="number"
                name="score"
                onChange={(e) => handleChange(e)}
                value={input.score}
                className="inputs"
              />
            </div>

            <div  className="items">
              <label>Healthy Level: (*)</label>
              <input
                type="number"
                name="level"
                onChange={(e) => handleChange(e)}
                value={input.level}
                className="inputs"
              />
            </div>
          </div>

          <div className="add_form">
            <div className="columnAdd">
              <label>Instructions:</label>
              <textarea
                name="instructions"
                onChange={(e) => handleChange(e)}
                value={input.instructions}
                className="textbox"
              />
              <div className="finaldiv">
              <label>Select the types of diets</label>
              {diet.map((e) => (
                <div className="types" key={e.id}>
                  <input
                  key={e}
                    onChange={handleCheck}
                    type="checkbox"
                    name="Types"
                    value={e}
                  />
                  {e}
                </div>
              ))}
              </div>
              <button className="create" type="submit">
        Create
      </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;

import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import { postRecipe } from "../../actions/index";

function AddRecipe() {
  const diet = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    summary: "",
    score: "",
    level: "",
    instructions: "",

    Types: [],
  });

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCheck(e) {
    if (e.target.name === "Types") {
      setInput({ ...input, Types: [...input.Types, e.target.value] });
    } else setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
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
              <button className="create" type="submit">Create</button>

      <div>
        <p>(*) Please fill the required fields </p>
        <form className="add_form" onSubmit={handleSubmit}>
          <div className="column">
            <div className="items">
              <label>Title (*)</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={input.title}
                className="inputs"
              />
            </div>
            <div className="items">
              <label>Summary (*) </label>
              <textarea
                name="summary"
                onChange={(e) => handleChange(e)}
                value={input.summary}
                className="textbox"
              />
            </div>

            <div className="items">
              <label>Score (*)</label>
              <input
                type="number"
                name="score"
                onChange={(e) => handleChange(e)}
                value={input.score}
                className="inputs"
              />
            </div>

            <div className="add_form">
              <label>Healthy Level (*)</label>
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
            <div className="column">
              <label>Instructions</label>
              <textarea
                name="instructions"
                onChange={(e) => handleChange(e)}
                value={input.instructions}
                className="textbox"
              />
              <label>Select the types of diets</label>
              {diet.map((e) => (
                <div className="types" key={e.id}>
                  <input
                    onChange={handleCheck}
                    type="checkbox"
                    name="Types"
                    value={e}
                  />
                  {e}
                </div>
              ))}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;

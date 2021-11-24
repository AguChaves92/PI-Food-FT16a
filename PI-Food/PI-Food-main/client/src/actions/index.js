import {
  GET_RECIPE_BY_NAME,
  GET_RECIPE_BY_ID,
  GET_TYPE,
  POST_RECIPE,
  NAME_ASC,
  NAME_DESC,
  RESET,
  SCORE_MAX_TO_MIN,
  SCORE_MIN_TO_MAX,
  FILTER,
} from "./types.js";

//defines actions

import axios from "axios";

export function getRecipes(name) {
  console.log("in actions",name);

  if(typeof name === "undefined"){
    name="none"
  }

  return async (dispatch) => {
    await axios
      .get(`http://localhost:3001/recipe/?name=${name}`)
      .then((response) => {
        dispatch({
          type: GET_RECIPE_BY_NAME,
          payload: response.data,
        });
      });
  };
}

export function getById(id) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/recipe/${id}`)
      .then((response) => {
        dispatch({ type: GET_RECIPE_BY_ID, payload: response.data });
      })
      .catch((error) => console.log(error));
  };
}

export function getTypes() {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/type`)
      .then((response) => {
        dispatch({ type: GET_TYPE, payload: response.data });
      })
      .catch((error) => console.log(error));
  };
}

export function postRecipe(data) {

    
  return async (dispatch) => {
    await axios
      .post(`http://localhost:3001/recipe`, data)
      .then((response) => {
        dispatch({ type: POST_RECIPE, payload: data });
      })
      .catch((error) => console.log(error));
  };
}

export function sortName(str) {
  if (str === RESET) {
    return {
      type: RESET,
    };
  }
  if (str === NAME_ASC) {
    return {
      type: NAME_ASC,
    };
  } else {
    return {
      type: NAME_DESC,
    };
  }
}

export function getOrderByScore(num) {
  if (num === RESET) {
    return {
      type: RESET,
    };
  }
  if (num === SCORE_MAX_TO_MIN) {
    return {
      type: SCORE_MAX_TO_MIN,
    };
  } else {
    return {
      type: SCORE_MIN_TO_MAX,
    };
  }
}

export function filter(str) {
  if (str === RESET) {//reseting the state in case all is selected
    return {
      type: RESET,
      payload: str,
    };
  }
  return {
    type: FILTER,
    payload: str,
  };
}

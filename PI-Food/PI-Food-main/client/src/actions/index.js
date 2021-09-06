import {
  GET_RECIPE,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_BY_ID,
  GET_TYPE,
  POST_RECIPE,
  NAME_ASC,
  NAME_DESC,
  RESET,
  SCORE_MAX_TO_MIN,
  SCORE_MIN_TO_MAX,
} from "./types.js";

import axios from "axios";

export function getRecipes(name) {
  name = name.toLowerCase();

  return (dispatch) => {
    axios
      .get(`http://localhost:3001/recipe?name=${name}`)
      .then((response) => {
        dispatch({ type: GET_RECIPE_BY_NAME, payload: response.data });
      })
      .catch((error) => console.log(error));
  };
}

export function getById(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/recipes/${id}`);
    dispatch({ type: GET_RECIPE_BY_ID, payload: response.data }).catch(
      (error) => console.log(error)
    );
  };
}

export function getTypes() {
  return (dispatch) => {
    axios.get(`http://localhost:3001/type`);
    dispatch({ type: GET_TYPE, payload: response.data }).catch((error) =>
      console.log(error)
    );
  };
}


export function postRecipe(data){
    return (dispatch)=>{
        axios.post(`http://localhost:3001/recipe`, data)
        dispatch({type:POST_RECIPE, payload: data }).catch((error) =>
        console.log(error)
        );
    };
}


export function sortName(num){
    if (num === RESET) {
        return {
            type: RESET,
        }
    }
    if (num === NAME_ASC) {
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
        }
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
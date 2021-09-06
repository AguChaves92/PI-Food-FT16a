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
  } from "../actions/types"

let initialState={
    recipes:[],
    recipesUnordered:[],
    recipeDetail:[],
    diets:[],
}
  

const reducer=(state=initialState, {type, payload}) =>{

switch(type){

    case GET_RECIPE_BY_NAME: 
        return {
            ...state,
            recipes: payload,
            recipesUnordered: payload
        };
    case GET_RECIPE_BY_ID:
        return {
            ...state,
            recipeDetail: payload
        };
    case GET_TYPE:
        return {
            ...state,
            diets: payload
        };
    case POST_RECIPE:
            return{ ...state}
    case NAME_ASC:
        return {
            ...state,
            recipes: state.recipes.sort((a,b)=>
             a.title.toLowerCase() < b.title.toLowerCase() ? 1:-1)
        };
    case NAME_DESC:
        return {
            ...state,
            recipes: state.recipes.sort((a,b)=>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1:-1
             )
        };
    case SCORE_MAX_TO_MIN:
        return {
            ...state,
            recipes: state.recipes.sort((a,b)=>
            a.score < b.spoonacularScore ? 1 : -1)
        };
    case SCORE_MIN_TO_MAX:
        return {
            ...state,
            recipes: state.recipes.sort((a,b)=>
            a.score > b.spoonacularScore ? 1 : -1)
        };
    case RESET:
        return { 
            ...state,
            recipes= recipesUnordered
        }

    default: return state;
}


}

export default reducer;
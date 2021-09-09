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
    FILTER
  } from "../actions/types"


let initialState={
    recipes:[],
    recipesUnordered:[],
    recipeDetail:[],
    diets:[],
}


const reducer=(state=initialState, {type, payload}) =>{

console.log( "in reducer. Type:" + type +" payload: "+payload )

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
        console.log("alf al reves")
        const ZtoA= state.recipes.sort((a,b)=>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1:-1);
        
        return {
            ...state,
            recipes: ZtoA
        };
    case NAME_DESC:
        console.log("alfabeticamente")

        const AtoZ= state.recipes.sort((a,b)=>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1:-1);
        return {
            ...state,
            recipes: AtoZ
             
        };
    case SCORE_MAX_TO_MIN:
        const MaxtoMin =state.recipes.sort((a,b)=>
        a.score < b.score ? 1 : -1)
        console.log(MaxtoMin)
        return {
            ...state,
            recipes: MaxtoMin
        };
    case SCORE_MIN_TO_MAX:
        const mintoMax= state.recipes.sort((a,b)=>
        a.score > b.score ? 1 : -1)
        return {
            ...state,
            recipes: mintoMax
        };
    case RESET:
        console.log("reseteando")
        return { 
            ...state,
            recipes: state.recipesUnordered
        }
    case FILTER:
        return {
            ...state,
            recipes:state.recipes.filter((r=> r.diets.includes(payload)))
        }


    default: return state;
}


}

export default reducer;
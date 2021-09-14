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
} from "../actions/types";

let initialState = {
  recipes: [],
  recipesUnordered: [],
  recipeDetail: [],
  diets: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: payload,
        recipesUnordered: payload,
      };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeDetail: payload,
      };
    case GET_TYPE:
      return {
        ...state,
        diets: payload,
      };

    case POST_RECIPE:
      return { ...state };

    case NAME_ASC:
      const ZtoA = state.recipes
        .slice(0, -1)
        .sort((a, b) =>
          a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
        );

      return {
        ...state,
        recipes: ZtoA,
      };
    case NAME_DESC:
      const AtoZ = state.recipes
        .slice(0)
        .sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
      return {
        ...state,
        recipes: AtoZ,
      };
    case SCORE_MAX_TO_MIN:
      const MaxtoMin = state.recipes
        .slice(0)
        .sort((a, b) => (a.score < b.score ? 1 : -1));

      return {
        ...state,
        recipes: MaxtoMin,
      };

    case SCORE_MIN_TO_MAX:
      const mintoMax = state.recipes
        .slice(0)
        .sort((a, b) => (a.score > b.score ? 1 : -1));

      return {
        ...state,
        recipes: mintoMax,
      };
    case RESET:
      return {
        ...state,
        recipes: state.recipesUnordered,
      };

    case FILTER:
      let filteredRecipes = [];

      for (let i = 0; i < state.recipes.length; i++) {
        if (state.recipes[i].hasOwnProperty("Types")) {
          filteredRecipes.push(state.recipes[i]);
        }
      }

      filteredRecipes = filteredRecipes.filter((e) =>
        e.Types?.map((e) => e.name).includes(payload)
      );
      return {
        ...state,
        recipes: filteredRecipes,
      };

    default:
      return state;
  }
};

export default reducer;

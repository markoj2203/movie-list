import { combineReducers } from "redux";

const getMovieByCategory = (state = "", action) => {
  switch (action.type) {
    case "GET_MOVIE_BY_CATEGORY":
      return { ...state, data: action.data };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  getMovieByCategory,
});

export default rootReducer;

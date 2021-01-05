import { combineReducers } from "redux";

const getMovieByCategory = (state = [], action) => {
  switch (action.type) {
    case "GET_MOVIE_BY_CATEGORY":
      return { ...state, data: action.data };
    default:
      return state;
  }
};

const setMovieID = (state = "", action) => {
  switch (action.type) {
    case "SET_MOVIE_ID":
      return { ...state, id: action.id };
    default:
      return state;
  }
};

const setImdbID = (state = "", action) => {
  switch (action.type) {
    case "SET_IMDB_ID":
      return { ...state, id: action.id };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  getMovieByCategory,
  setMovieID,
  setImdbID,
});

export default rootReducer;

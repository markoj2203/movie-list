export const getMovieByCategory = (data) => {
  return {
    type: "GET_MOVIE_BY_CATEGORY",
    payload: data,
  };
};

export const setMovieID = (id) => {
  return {
    type: "SET_MOVIE_ID",
    payload: id,
  };
};

export const setImdbID = (id) => {
  return {
    type: "SET_IMDB_ID",
    payload: id,
  };
};

export const getMovieByCategory = (data) => {
  return {
    type: "GET_MOVIE_BY_CATEGORY",
    payload: data,
  };
};

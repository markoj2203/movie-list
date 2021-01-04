import React from "react";
import { useSelector } from "react-redux";

export default function Movie() {
  const movieID = useSelector((state) => state.setMovieID.id);
  console.log(movieID);
  return <div>Movie</div>;
}

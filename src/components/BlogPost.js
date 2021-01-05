import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

export default function BlogPost() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dataByCategory = useSelector((state) => state.getMovieByCategory.data);
  const dispatch = useDispatch();

  const goToMovieData = (movieID, imdbID) => {
    localStorage.setItem("movieID", movieID);
    localStorage.setItem("imdbID", imdbID);
    dispatch({ type: "SET_MOVIE_ID", id: movieID });
    dispatch({ type: "SET_IMDB_ID", id: imdbID });
  };

  const getBlogPosts = async () => {
    setLoading(true);
    await axios
      .get("https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.Message);
        }
      });
  };

  useEffect(() => {
    if (dataByCategory !== undefined) {
      if (dataByCategory.length > 0) {
        setData(dataByCategory);
      } else {
        getBlogPosts();
      }
    } else {
      getBlogPosts();
    }
  }, [dataByCategory]);

  return (
    <div className="row">
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          {data.map((item, i) => (
            <div key={i} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-movie">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text card-text-post">{item.description}</p>
                  <Link
                    to="/movie"
                    className="card-link"
                    onClick={() => goToMovieData(item.id, item.imdbId)}
                  >
                    Go to movie...
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

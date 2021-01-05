import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toggleElement } from "../functions/main";
import GoogleAuth from "./GoogleAuth";

export default function Movie() {
  const movieID = useSelector((state) => state.setMovieID.id);
  const imdbID = useSelector((state) => state.setImdbID.id);
  const id = movieID !== undefined ? movieID : localStorage.getItem("movieID");
  const idImdb = imdbID !== undefined ? imdbID : localStorage.getItem("imdbID");
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [trailerID, setTrailerID] = useState("");

  const getMovieTrailer = async () => {
    const options = {
      method: "GET",
      url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${idImdb}`,
      headers: {
        "x-rapidapi-key": "c05cb70ecemsh7b501c8dc7439c8p1f76ccjsndabb9bdf0a8b",
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        //console.log(response.data.trailer.id);
        setTrailerID(response.data.trailer.id);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getMovieData = async () => {
    await axios
      .get(`https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.Message);
        }
      });
  };

  const getMovieComments = async () => {
    //setLoading(true);
    await axios
      .get(
        `https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${id}/comments`
      )
      .then((result) => {
        //console.log(result.data);
        setComments(result.data);
        //setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.Message);
        }
      });
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      window.location.href = "http://localhost:3000/";
    };
    getMovieData();
    getMovieTrailer();
    getMovieComments();
  }, [movieID]);

  return (
    <div className="movie-container">
      <div className="card" style={{ width: "40rem" }}>
        <img className="movie-img" src={data.imageUrl} />
        <div className="card-body">
          <p className="card-text">Movie Name:</p>
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">Description:</p>
          <p className="card-text">{data.description}</p>
        </div>
        <hr />

        <div className="card-body">
          <h5 className="card-title">
            <label>Official Trailer </label>
          </h5>
          <div className="frame-content">
            <iframe
              width="500"
              height="315"
              src={`https://www.imdb.com/video/imdb/${trailerID}/imdb/embed?autoplay=false&width=480`}
            ></iframe>
          </div>
        </div>
        <hr />
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={() => toggleElement("collapseOne")}
                >
                  Comments
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                {comments.map((item, i) => (
                  <div key={i}>
                    <hr />
                    <p className="text-comment">{item.text}</p>
                    <p className="time-comment">{item.createdAt}</p>
                  </div>
                ))}
                <div className="card-text" style={{ width: "100%" }}>
                  <hr />
                  <h5>Leave a comment</h5>
                  <textarea
                    id="text-content"
                    placeholder="Write comment:"
                    style={{ width: "100%" }}
                  />
                </div>
                <div
                  className="card-text"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <GoogleAuth />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

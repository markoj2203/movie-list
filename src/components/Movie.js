import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toggleElement } from "../functions/main";

export default function Movie() {
  const movieID = useSelector((state) => state.setMovieID.id);

  const id = movieID !== undefined ? movieID : localStorage.getItem("movieID");

  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

  const getMovieData = async () => {
    //setLoading(true);

    await axios
      .get(`https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${id}`)
      .then((result) => {
        //console.log(result.data);
        setData(result.data);
        //setLoading(false);
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
    getMovieData();
    getMovieComments();
  }, [movieID]);

  return (
    <div className="movie-container">
      <div className="card" style={{ width: "30rem" }}>
        <img className="movie-img" src={data.imageUrl} />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">{data.description}</p>
        </div>

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
              style={{ display: "none" }}
            >
              <div className="card-body">
                {comments.map((item, i) => (
                  <div key={i}>
                    <hr />
                    <p className="text-comment">{item.text}</p>
                    <p className="time-comment">{item.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

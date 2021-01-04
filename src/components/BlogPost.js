import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function BlogPost() {
  const [data, setData] = useState([]);
  const dataByCategory = useSelector((state) => state.getMovieByCategory.data);

  const getBlogPosts = async () => {
    await axios
      .get("https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies")
      .then((result) => {
        setData(result.data);
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
      {data.map((item, i) => (
        <div key={i} className="col-md-6 col-lg-4 col-xl-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <a href="#" className="card-link">
                Go to movie...
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

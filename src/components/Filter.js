import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Filter() {
  const [categoryList, setCategoryList] = useState([]);

  const filterByCategory = async (catID) => {
    await axios
      .get(
        `https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1//movies?categoryId=${catID}`
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.Message);
        }
      });
  };

  const getCategories = async () => {
    await axios
      .get("https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/categories")
      .then((result) => {
        setCategoryList(result.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.Message);
        }
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="jumbotron">
      <div className="dropdown">
        <div className="form-group">
          <label htmlFor="demo_overview_minimal">Select a movie category</label>
          <select
            id="demo_overview_minimal"
            className="form-control"
            data-role="select-dropdown"
            data-profile="minimal"
          >
            <option>Category</option>
            {categoryList.map((item, i) => (
              <option
                onChange={() => filterByCategory(item.id)}
                key={i}
                id={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

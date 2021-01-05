import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function GoogleAuth() {
  //const [data, setData] = useState([]);
  const movieID = useSelector((state) => state.setMovieID.id);
  const id = movieID !== undefined ? movieID : localStorage.getItem("movieID");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    /*    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "716153118107-pjoo676lifap3neq9ojge2kqeuqlqqjf.apps.googleusercontent.com",
        scope: "email",
      });
    }); */
  }, []);

  const publishComment = async () => {
    const text = document.getElementById("text-content").value;

    await axios
      .post(
        `https://dev-zyl1uf8a.eu.auth0.com/oauth/token`,
        {
          client_id: "tw0z2wlisNFH0RE5rc3a72PlY9Zf7fQ2",
          client_secret:
            "i-UZHgDgw87KOhrx-kn5T9rivCD5ZTPJpg-TiBwnoPV27bBHJoZbhEuomVX_QwmS",
          audience: "https://dev-zyl1uf8a.eu.auth0.com/api/v2/",
          grant_type: "client_credentials",
          crossDomain: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((result) => {
        //console.log(result.data);
        //setData(result.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.Message);
        }
      });
    /*
    if (loginStatus !== false) {
      console.log(window.gapi.auth2);
      await axios
        .post(
          `https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${id}/comment`,
          { text: text },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          console.log(result.data);
          //setData(result.data);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.Message);
          }
        });
    } else {
      window.gapi.auth2.getAuthInstance().signIn();
    }*/
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={publishComment}
      >
        Publish
      </button>
    </div>
  );
}

import React from "react";

export default function Card() {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="card-link">
            Go to post...
          </a>
        </div>
      </div>
    </div>
  );
}

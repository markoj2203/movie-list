import React from "react";
import Header from "./Header";
import Filter from "./Filter";
import BlogPost from "./BlogPost";
import Movie from "./Movie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Header />
            <Filter />
            <BlogPost />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import Header from "./Header";
import Filter from "./Filter";
import BlogPost from "./BlogPost";

function App() {
  return (
    <div className="container">
      <Header />
      <Filter />
      <BlogPost />
    </div>
  );
}

export default App;

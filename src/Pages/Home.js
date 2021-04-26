import React from "react";
import FeedContainer from "../components/FeedContainer";
import NavBar from "../components/NavBar";
import SecondContainer from "../components/SecondContainer";

import Sidebar from "../components/Sidebar";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="main-container">
        <NavBar title="Home" />

        <div className="components-container">
          <FeedContainer />
          <SecondContainer title="Recent" />
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import FeedContainer from "../components/FeedContainer";
import NavBar from "../components/NavBar";
import RecentContainer from "../components/RecentContainer";
import Sidebar from "../components/Sidebar";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="main-container">
        <NavBar />

        <div className="components-container">
          <FeedContainer />
          <RecentContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;

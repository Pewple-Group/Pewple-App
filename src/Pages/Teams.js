import React from "react";
import "./Teams.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
function Teams() {
  return (
    <div className="Teams">
      <Sidebar />
      <div className="main-container">
        <NavBar />
      </div>
    </div>
  );
}

export default Teams;

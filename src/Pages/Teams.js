import React from "react";
import "./Teams.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import TeamList from "../components/TeamList";
function Teams() {
  return (
    <div className="Teams">
      <Sidebar />
      <div className="main-container">
        <NavBar title="Teams" />

        <div className="teams_components">
          <TeamList />
        </div>
      </div>
    </div>
  );
}

export default Teams;

import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

import "./TeamPage.css";
function TeamPage() {
  return (
    <div className="team-page">
      <Sidebar />
      <div className="main-container">
        <NavBar />
      </div>
    </div>
  );
}

export default TeamPage;

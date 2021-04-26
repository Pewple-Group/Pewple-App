import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import TeamChat from "../components/TeamChat";
import Teamtodo from "../components/Teamtodo";
import "./TeamPage.css";
function TeamPage() {
  return (
    <div className="team-page">
      <Sidebar small={false} />
      <div className="main-container">
        <NavBar title="Team" />
        <div className="team-page-components">
          <TeamChat />
          <Teamtodo />
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

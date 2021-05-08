import React from "react";
import "./Teams.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import TeamList from "../components/TeamList";
function Teams({ signOut, user }) {
  return (
    <div className="Teams">
      <Sidebar signOut={signOut} user={user} />
      <div className="main-container">
        <NavBar title="Teams" CurrentUser={user} />

        <div className="teams_components">
          <TeamList />
        </div>
      </div>
    </div>
  );
}

export default Teams;

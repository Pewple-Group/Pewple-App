import React from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import TeamChat from "../components/TeamChat";
import Teamtodo from "../components/Teamtodo";
import "./TeamPage.css";
function TeamPage({ signOut, user }) {
  const { teamId } = useParams();

  return (
    <div className="team-page">
      <Sidebar small={false} signOut={signOut} user={user} />
      <div className="main-container">
        <NavBar title="Team" CurrentUser={user} />
        <div className="team-page-components">
          <TeamChat teamId={teamId} />
          <Teamtodo teamId={teamId.slice(1)} />
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

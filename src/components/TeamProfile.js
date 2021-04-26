import React, { useState } from "react";
import "./TeamProfile.css";
import AddMemberIcon from "../assets/add-friend.svg";
import TeamEditIcon from "../assets/pencil.svg";
import TeamDeleteIcon from "../assets/trash.svg";
import MembersIcon from "../assets/members-only.svg";
import { Dialog, DialogTitle } from "@material-ui/core";

function TeamProfile({ teamName, projectName, LeaderName }) {
  return (
    <div className="team_profile">
      <div className="team_detail">
        <div className="team_sr_no">
          <p>1.</p>
        </div>
        <div className="team_info">
          <p className="team_name">{teamName}</p>
          <p className="team_project_name">Project Name: {projectName}</p>
          <p className="team_leader">Leader: {LeaderName}</p>
        </div>
      </div>

      <div className="team__options">
        <img src={MembersIcon} alt="" />
        <img src={AddMemberIcon} alt="" />
        <img src={TeamEditIcon} alt="" />
        <img src={TeamDeleteIcon} alt="" />
      </div>
    </div>
  );
}

export default TeamProfile;

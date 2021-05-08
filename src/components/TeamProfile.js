import React, { useState } from "react";
import "./TeamProfile.css";
import AddMemberIcon from "../assets/add-friend.svg";
import TeamEditIcon from "../assets/pencil.svg";
import TeamDeleteIcon from "../assets/trash.svg";
import MembersIcon from "../assets/members-only.svg";
import { Dialog, DialogTitle } from "@material-ui/core";
import { auth } from "../firebase";

function TeamProfile({
  teamName,
  id,
  projectName,
  LeaderName,
  SrNo,
  deleteTeam,
  gotoTeam,
}) {
  return (
    <div className="team_profile">
      <div className="team_detail" onClick={() => gotoTeam(id)}>
        <div className="team_sr_no">
          <p>{SrNo + 1}.</p>
        </div>
        <div className="team_info">
          <p className="team_name">{teamName}</p>
          <p className="team_project_name">Project Name: {projectName}</p>
          <p className="team_leader">
            Leader:
            {LeaderName === auth.currentUser?.displayName ? "You" : LeaderName}
          </p>
        </div>
      </div>

      <div className="team__options">
        <img
          src={TeamDeleteIcon}
          alt=""
          onClick={(e) => {
            let TeamDetail = {
              TeamName: teamName,
              ProjectName: projectName,
              id: id,
              leader: LeaderName,
            };
            deleteTeam(TeamDetail);
          }}
        />
      </div>
    </div>
  );
}

export default TeamProfile;

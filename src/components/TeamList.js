import React, { useState } from "react";
import "./TeamList.css";
import addIcon from "../assets/plus.svg";
import TeamProfile from "./TeamProfile";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
function TeamList() {
  const [createNewTeamDialog, setCreateNewTeamDialog] = useState(false);
  return (
    <div className="team-list">
      <Dialog open={createNewTeamDialog} maxWidth="sm" fullWidth={true}>
        <DialogTitle>
          <CloseIcon onClick={(e) => setCreateNewTeamDialog(false)} />
        </DialogTitle>

        <DialogContent>
          <div className="newTeam_container">
            <div className="newteam_detail">
              <div className="newTeam_nameInput">
                <p>Team Name</p>
                <input type="text" placeholder="Piped Pipers" />
              </div>

              <div className="newTeam_projectNameInput">
                <p>Project Name</p>
                <input type="text" placeholder="Social Media App" />
              </div>
            </div>

            <div className="newTeam_selectMember">
              <p className="Select_memberTitle">Select Member For your team.</p>

              <input
                type="text"
                className="searchMember"
                placeholder="Search Member"
              />
              <div className="member_container">
                <div className="newTeamMember_container">
                  <div className="memberDetail">
                    <div className="member_image">
                      <img src={ProfilePicture} alt="" />
                    </div>
                    <div className="member_info">
                      <p className="member_name">Dhruval Patel</p>
                      <p className="member_userName">@pd_26072001</p>
                    </div>
                  </div>

                  <div className="member_selectedMark">
                    <input type="checkbox" name="member" id="member" />
                  </div>
                </div>
                <div className="newTeamMember_container">
                  <div className="memberDetail">
                    <div className="member_image">
                      <img src={ProfilePicture} alt="" />
                    </div>
                    <div className="member_info">
                      <p className="member_name">Dhruval Patel</p>
                      <p className="member_userName">@pd_26072001</p>
                    </div>
                  </div>

                  <div className="member_selectedMark">
                    <input type="checkbox" name="member" id="member" />
                  </div>
                </div>

                <div className="newTeamMember_container">
                  <div className="memberDetail">
                    <div className="member_image">
                      <img src={ProfilePicture} alt="" />
                    </div>
                    <div className="member_info">
                      <p className="member_name">Dhruval Patel</p>
                      <p className="member_userName">@pd_26072001</p>
                    </div>
                  </div>

                  <div className="member_selectedMark">
                    <input type="checkbox" name="member" id="member" />
                  </div>
                </div>
                <div className="newTeamMember_container">
                  <div className="memberDetail">
                    <div className="member_image">
                      <img src={ProfilePicture} alt="" />
                    </div>
                    <div className="member_info">
                      <p className="member_name">Dhruval Patel</p>
                      <p className="member_userName">@pd_26072001</p>
                    </div>
                  </div>

                  <div className="member_selectedMark">
                    <input type="checkbox" name="member" id="member" />
                  </div>
                </div>
                <div className="newTeamMember_container">
                  <div className="memberDetail">
                    <div className="member_image">
                      <img src={ProfilePicture} alt="" />
                    </div>
                    <div className="member_info">
                      <p className="member_name">Dhruval Patel</p>
                      <p className="member_userName">@pd_26072001</p>
                    </div>
                  </div>

                  <div className="member_selectedMark">
                    <input type="checkbox" name="member" id="member" />
                  </div>
                </div>
              </div>

              <div className="createTeambtn">
                <button
                  className="cancelbtn"
                  onClick={(e) => setCreateNewTeamDialog(false)}
                >
                  Cancel
                </button>
                <button className="createbtn">Create</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="teamlist_navbar">
        <div className="teamlist_searchbar">
          <input type="text" placeholder="Search your team..." />
        </div>
        <div
          className="create_new_team_btn"
          onClick={(e) => setCreateNewTeamDialog(true)}
        >
          <img src={addIcon} alt="" />
          <p>Create Team</p>
        </div>
      </div>
      <div className="teamlistContainer">
        <TeamProfile
          teamName="Piped Pipers"
          projectName="Amazon Clone"
          LeaderName="Dhruval Patel"
        />
        <TeamProfile
          teamName="Piped Pipers"
          projectName="Amazon Clone"
          LeaderName="Dhruval Patel"
        />
      </div>
    </div>
  );
}

export default TeamList;

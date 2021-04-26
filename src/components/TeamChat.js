import React, { useState } from "react";
import "./TeamChat.css";
import AddMemberIcon from "../assets/add-user.svg";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ProfilePicture from "../assets/Dhruval.jpeg";
function TeamChat() {
  const [addNewMemberDialog, setAddNewMemberDialog] = useState(false);

  return (
    <div className="Team-chatbox">
      <Dialog open={addNewMemberDialog} maxWidth="sm" fullWidth={true}>
        <DialogTitle>
          <CloseIcon onClick={(e) => setAddNewMemberDialog(false)} />
        </DialogTitle>

        <DialogContent>
          <div className="addNewMember_container">
            <p className="addMember_title">Select a Member</p>
            <div className="addNewMember">
              <div className="addNewTeamMember_container">
                <div className="addMemberDetail">
                  <div className="addMember_image">
                    <img src={ProfilePicture} alt="" />
                  </div>
                  <div className="addMember_info">
                    <p className="addMember_name">Dhruval Patel</p>
                    <p className="addMember_userName">@pd_26072001</p>
                  </div>
                </div>

                <div className="addMember_selectedMark">
                  <input type="checkbox" name="member" id="member" />
                </div>
              </div>

              <div className="addNewTeamMember_container">
                <div className="addMemberDetail">
                  <div className="addMember_image">
                    <img src={ProfilePicture} alt="" />
                  </div>
                  <div className="addMember_info">
                    <p className="addMember_name">Dhruval Patel</p>
                    <p className="addMember_userName">@pd_26072001</p>
                  </div>
                </div>

                <div className="addMember_selectedMark">
                  <input type="checkbox" name="member" id="member" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="Chat-Top">
        <div className="Chat-navtitle">
          <p>Pewple Group</p>
        </div>

        <div className="chat-navSearch">
          <input type="text" placeholder="Search Member ..." />
        </div>

        <div
          className="chat-navAddMember"
          onClick={(e) => setAddNewMemberDialog(true)}
        >
          <img src={AddMemberIcon} alt="" />
          <p>Add Member</p>
        </div>
      </div>

      <div className="chatMessage-container">
        <ChatMessage />
        <ChatMessage currentUser={true} />
        <ChatMessage />
      </div>

      <ChatInput />
    </div>
  );
}

export default TeamChat;

import React from "react";
import "./MessengerContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
function MessengerContainer() {
  return (
    <div className="messenger__container">
      <div className="mc-navbar">
        <div className="mc-navbar-userimage">
          <img src={PradhumanImage} alt="" />
        </div>
        <div className="mc-navbar-username">
          <p>Pradhuman Patel</p>
        </div>
      </div>
      <div className="mc-messages">
        <ChatMessage />
        <ChatMessage currentUser="true" />
        <ChatMessage currentUser="true" />
        <ChatMessage currentUser="true" />
        <ChatMessage currentUser="true" />
      </div>
      <div className="mc-ChatInput">
        <ChatInput />
      </div>
    </div>
  );
}

export default MessengerContainer;

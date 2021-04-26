import React from "react";
import FriendProfile from "./FriendProfile";
import "./SuggestionContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";

function SuggestionContainer() {
  return (
    <div className="suggestion">
      <div className="suggestion-glass">
        <div className="suggestion_title">
          <p>Suggestion</p>
        </div>

        <div className="FriendsList">
          <FriendProfile
            name="Dhruval Patel"
            userName="pdpatel267"
            friendsImage={ProfilePicture}
            isSuggestion={true}
          />
          <FriendProfile
            name="Pradhuman Patel"
            message="How, are you Bro?"
            friendsImage={PradhumanImage}
            userName="pdpatel267"
            isSuggestion={true}
          />
          <FriendProfile
            name="Pradhuman Patel"
            message="How, are you Bro?"
            friendsImage={PradhumanImage}
            userName="pdpatel267"
            isSuggestion={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SuggestionContainer;

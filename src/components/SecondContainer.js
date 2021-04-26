import React from "react";
import FriendProfile from "./FriendProfile";
import "./SecondContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
function SecondContainer({ title, isRecent, isSuggestion }) {
  return (
    <div className="recent">
      <div className="recent-glass">
        <div className="recent_title">
          <p>{title}</p>
        </div>

        <div className="FriendsList">
          <FriendProfile
            name="Dhruval Patel"
            message="How, are you Bro?"
            friendsImage={ProfilePicture}
            isRecent={true}
          />
          <FriendProfile
            name="Pradhuman Patel"
            message="How, are you Bro?"
            friendsImage={PradhumanImage}
            isRecent={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SecondContainer;

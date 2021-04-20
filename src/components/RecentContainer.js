import React from "react";
import FriendProfile from "./FriendProfile";
import "./RecentContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
function RecentContainer() {
  return (
    <div className="recent">
      <div className="recent-glass">
        <div className="recent_title">
          <p>Recent</p>
        </div>

        <div className="FriendsList">
          <FriendProfile
            name="Dhruval Patel"
            message="How, are you Bro?"
            friendsImage={ProfilePicture}
          />
          <FriendProfile
            name="Dhruval Patel"
            message="How, are you Bro?"
            friendsImage={ProfilePicture}
          />
          <FriendProfile
            name="Dhruval Patel"
            message="How, are you Bro?"
            friendsImage={ProfilePicture}
          />
        </div>
      </div>
    </div>
  );
}

export default RecentContainer;

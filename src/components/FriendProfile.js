import React from "react";
import "./FriendProfile.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
function FriendProfile({ name, message, friendsImage }) {
  return (
    <div className="friendsProfile">
      <div className="friend-image">
        <img src={friendsImage} alt="" />
      </div>
      <div className="friends_info">
        <p className="friends_name">{name}</p>
        <p className="friends_message">{message}</p>
      </div>
    </div>
  );
}

export default FriendProfile;

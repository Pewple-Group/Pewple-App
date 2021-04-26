import React from "react";
import "./FriendProfile.css";
import CheckedIcon from "../assets/checked.svg";
import DustBinIcon from "../assets/dustbin.svg";
function FriendProfile({
  name,
  message,
  friendsImage,
  userName,
  isRecent,
  isSuggestion,
}) {
  return (
    <div className="friendsProfile">
      <div className="friends_detail">
        <div className="friend-image">
          <img src={friendsImage} alt="" />
        </div>
        <div className="friends_info">
          <p className="friends_name">{name}</p>
          <p className="friends_detail">
            {isRecent ? message : isSuggestion ? `@${userName}` : ""}
          </p>
        </div>
      </div>
      {isSuggestion && (
        <div className="friendRequestOptions">
          <img src={CheckedIcon} alt="" />
          <img src={DustBinIcon} alt="" />
        </div>
      )}
    </div>
  );
}

export default FriendProfile;

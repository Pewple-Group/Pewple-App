import React from "react";
import "./FriendList.css";
import ProfilePicture from "../assets/Dhruval.jpeg";

import RemoveUserIcon from "../assets/remove-user.svg";
import sendIcon from "../assets/send.svg";
function FriendList() {
  return (
    <div className="friend-list">
      <div className="friendlist_navbar">
        <div className="friendlist_navbarTitle">
          <p>Friends-List</p>
        </div>

        <div className="friendlist_searchBar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="friendlist-container">
        <div className="friends_container">
          <div className="friendsContainer_details">
            <div className="friendslist_friendsImage">
              <img src={ProfilePicture} alt="" />
            </div>
            <div className="friendslist_friendsInfo">
              <p className="friendsList_friendsName">Patel Dhruval</p>
              <p className="friendslist_friendsUserName">@pd_26072001</p>
            </div>
          </div>

          <div className="friendContainer_option">
            <img src={sendIcon} alt="" />
            <img src={RemoveUserIcon} alt="" />
          </div>
        </div>
        <div className="friends_container">
          <div className="friendsContainer_details">
            <div className="friendslist_friendsImage">
              <img src={ProfilePicture} alt="" />
            </div>
            <div className="friendslist_friendsInfo">
              <p className="friendsList_friendsName">Patel Dhruval</p>
              <p className="friendslist_friendsUserName">@pd_26072001</p>
            </div>
          </div>

          <div className="friendContainer_option">
            <img src={sendIcon} alt="" />
            <img src={RemoveUserIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendList;

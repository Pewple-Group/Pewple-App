import React from "react";
import "./MessengerSidebar.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import DropDown from "../assets/Dropdown.svg";
import FriendProfile from "./FriendProfile";
function MessengerSidebar() {
  return (
    <div className="messenger_sidebar">
      <div className="ms-UserProfile">
        <div className="ms-profile-img">
          <img src={ProfilePicture} alt="" />
        </div>

        <div className="ms-profile-info">
          <p className="ms-profile-fullname">Patel Dhruval</p>
          <p className="ms-profile-username">pd06072001@gmail.com</p>
        </div>
      </div>

      <div className="ms_searchBar">
        <input type="text" placeholder="Search Here ..." />
      </div>

      <div className="ms_friendlist">
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />

        <FriendProfile
          name="Dhruval Patel"
          message="How, are you Bro?"
          friendsImage={ProfilePicture}
          isRecent={true}
        />
      </div>
    </div>
  );
}

export default MessengerSidebar;

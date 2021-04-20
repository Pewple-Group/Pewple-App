import React from "react";
import "./Sidebar.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import DropDown from "../assets/Dropdown.svg";
import HomeLogo from "../assets/home.png";
import FriendsLogo from "../assets/friends.svg";
import TeamLogo from "../assets/people.svg";
import FilemanagerLogo from "../assets/source.svg";
import LogOutLogo from "../assets/logout.svg";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_component">
        <div className="sidebar-container">
          <div className="sidebar-UserProfile">
            <div className="profile-img">
              <img src={ProfilePicture} alt="" />
            </div>
            <div className="profile-info">
              <p className="profile-fullname">Patel Dhruval</p>
              <p className="profile-username">pd06072001@gmail.com</p>
            </div>
            <div className="profile-dropdown">
              <img src={DropDown} alt="" />
            </div>
          </div>

          <div className="sidebar-options">
            <div className="sidebar-option">
              <div className="option-img">
                <img src={HomeLogo} alt="" />
              </div>
              <p>Home</p>
            </div>
            <div className="sidebar-option">
              <div className="option-img">
                <img src={FriendsLogo} alt="" />
              </div>
              <p>Friends</p>
            </div>
            <div className="sidebar-option">
              <div className="option-img">
                <img src={TeamLogo} alt="" />
              </div>
              <p>Teams</p>
            </div>
            <div className="sidebar-option">
              <div className="option-img">
                <img src={FilemanagerLogo} alt="" />
              </div>
              <p>File Manager</p>
            </div>
          </div>
        </div>

        <div className="sidebar-logout">
          <div className="logout-img">
            <img src={LogOutLogo} alt="" />
          </div>
          <p>Log-Out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

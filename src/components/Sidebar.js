import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import ProfilePicture from "../assets/Dhruval.jpeg";
import DropDown from "../assets/Dropdown.svg";
import HomeLogo from "../assets/home.png";
import FriendsLogo from "../assets/friends.svg";
import TeamLogo from "../assets/people.svg";
import FilemanagerLogo from "../assets/source.svg";
import LogOutLogo from "../assets/logout.svg";
import { auth } from "../firebase";
function Sidebar({ small }) {
  return (
    <div className="sidebar">
      <div className="sidebar_component">
        <div className="sidebar-container">
          <div className="sidebar-UserProfile">
            <div className="profile-img">
              <img src={auth.currentUser.photoURL} alt="" />
            </div>
            {!small && (
              <div className="profile-info">
                <p className="profile-fullname">
                  {auth.currentUser.displayName}
                </p>
                <p className="profile-username">{auth.currentUser.email}</p>
              </div>
            )}
            <div className="profile-dropdown">
              <img src={DropDown} alt="" />
            </div>
          </div>

          <div className="sidebar-options">
            <div className="sidebar-option">
              <Link to="/home" className="sidebar-link">
                <div className="option-img">
                  <img src={HomeLogo} alt="" />
                </div>
                {!small && <p>Home</p>}
              </Link>
            </div>
            <div className="sidebar-option">
              <Link to="/friends" className="sidebar-link">
                <div className="option-img">
                  <img src={FriendsLogo} alt="" />
                </div>
                {!small && <p>Friends</p>}
              </Link>
            </div>
            <div className="sidebar-option">
              <Link to="/teams" className="sidebar-link">
                <div className="option-img">
                  <img src={TeamLogo} alt="" />
                </div>
                {!small && <p>Teams</p>}
              </Link>
            </div>
            <div className="sidebar-option">
              <Link to="/filemanager" className="sidebar-link">
                <div className="option-img">
                  <img src={FilemanagerLogo} alt="" />
                </div>
                {!small && <p>File Manager</p>}
              </Link>
            </div>
          </div>
        </div>

        <div className="sidebar-logout">
          <div className="logout-img">
            <img src={LogOutLogo} alt="" />
          </div>
          {!small && <p>Log-Out</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

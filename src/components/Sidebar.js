import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

import DropDown from "../assets/Dropdown.svg";
import HomeLogo from "../assets/home.png";
import FriendsLogo from "../assets/friends.svg";
import TeamLogo from "../assets/people.svg";
import FilemanagerLogo from "../assets/source.svg";
import LogOutLogo from "../assets/logout.svg";
import db, { auth } from "../firebase";
import { useHistory } from "react-router-dom";

function Sidebar({ small, signOut, user }) {
  const history = useHistory();
  const [activeUser, setActiveUser] = useState({});
  const gotoFile = () => {
    history.push(`/file:${auth.currentUser?.uid}`);
  };
  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await db
        .collection("users")
        .doc(user.id)
        .onSnapshot((snapshot) => setActiveUser(snapshot.data()));
    };
    getCurrentUser();
  }, []);

  const gotoProfile = (userId) => {
    if (userId) {
      history.push(`/profile:${userId}`);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar_component">
        <div className="sidebar-container">
          <div
            className="sidebar-UserProfile"
            onClick={() => gotoProfile(activeUser?.id)}
          >
            <div className="profile-img">
              <img src={activeUser?.photo} alt="" />
            </div>
            {!small && (
              <div className="profile-info">
                <p className="profile-fullname">{activeUser?.fullname}</p>
                <p className="profile-username">{activeUser?.email}</p>
              </div>
            )}
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
            <div className="sidebar-option" onClick={gotoFile}>
              <div className="option-img">
                <img src={FilemanagerLogo} alt="" />
              </div>
              {!small && <p>File Manager</p>}
            </div>
          </div>
        </div>

        <div
          className="sidebar-logout"
          onClick={() => {
            history.push("/");
            signOut();
          }}
        >
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

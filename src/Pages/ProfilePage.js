import React from "react";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import "./ProfilePage.css";
function ProfilePage() {
  return (
    <div className="profile__page">
      <Sidebar />
      <div className="profile-container">
        <UserProfile />
      </div>
    </div>
  );
}

export default ProfilePage;

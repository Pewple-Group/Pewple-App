import React from "react";
import { useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import "./ProfilePage.css";
function ProfilePage({ signOut, user }) {
  const { userId } = useParams();
  return (
    <div className="profile__page">
      <Sidebar signOut={signOut} user={user} />
      <div className="profile-container">
        <UserProfile user={user} userId={userId.slice(1)} />
      </div>
    </div>
  );
}

export default ProfilePage;

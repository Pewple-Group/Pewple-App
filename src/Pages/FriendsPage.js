import React from "react";
import "./FriendsPage.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
function FriendsPage() {
  return (
    <div className="friends-Page">
      <Sidebar />
      <div className="main-container">
        <NavBar />
      </div>
    </div>
  );
}

export default FriendsPage;

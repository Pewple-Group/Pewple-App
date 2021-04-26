import React from "react";
import "./FriendsPage.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FriendList from "../components/FriendList";
import SecondContainer from "../components/SecondContainer";
import SuggestionContainer from "../components/SuggestionContainer";
function FriendsPage() {
  return (
    <div className="friends-Page">
      <Sidebar />
      <div className="main-container">
        <NavBar title="Friends" />
        <div className="friend-list-container">
          <FriendList />
          <SuggestionContainer isSuggestion={true} />
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;

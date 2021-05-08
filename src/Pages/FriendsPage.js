import React from "react";
import "./FriendsPage.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FriendList from "../components/FriendList";
import SecondContainer from "../components/SecondContainer";
import SuggestionContainer from "../components/SuggestionContainer";
function FriendsPage({ signOut, user }) {
  return (
    <div className="friends-Page">
      <Sidebar signOut={signOut} user={user} />
      <div className="main-container">
        <NavBar title="Friends" CurrentUser={user} />
        <div className="friend-list-container">
          <FriendList />
          <SuggestionContainer isSuggestion={true} />
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;

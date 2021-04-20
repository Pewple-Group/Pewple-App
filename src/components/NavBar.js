import React from "react";
import MessengerLogo from "../assets/send.svg";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="navbar">
      <p className="navbar-title">Home</p>
      <div className="navbar-searchContainer">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="navbar-messenger-btn">
        <div className="messenger-logo">
          <img src={MessengerLogo} alt="" />
        </div>
        <p>Messenger</p>
      </div>
    </div>
  );
}

export default NavBar;

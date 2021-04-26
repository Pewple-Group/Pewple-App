import React from "react";
import MessengerLogo from "../assets/send.svg";
import "./NavBar.css";
function NavBar({ title }) {
  return (
    <div className="navbar">
      <div className="navbar_title">
        <p>{title}</p>
      </div>

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

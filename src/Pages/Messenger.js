import React from "react";
import MessengerContainer from "../components/MessengerContainer";
import MessengerSidebar from "../components/MessengerSidebar";
import "./Messenger.css";
function Messenger() {
  return (
    <div className="Messenger">
      <MessengerSidebar />
      <MessengerContainer />
    </div>
  );
}

export default Messenger;

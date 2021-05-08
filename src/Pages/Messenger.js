import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import MessengerContainer from "../components/MessengerContainer";
import MessengerSidebar from "../components/MessengerSidebar";
import "./Messenger.css";
function Messenger({ user }) {
  const { userId } = useParams();

  return (
    <div className="Messenger">
      <MessengerSidebar user={user} />

      {userId ? (
        <MessengerContainer userId={userId.slice(1)} currentUser={user} />
      ) : (
        <div className="messenger__home"></div>
      )}
    </div>
  );
}

export default Messenger;

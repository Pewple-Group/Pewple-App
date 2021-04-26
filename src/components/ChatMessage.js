import React from "react";
import "./ChatMessage.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
function ChatMessage({ currentUser }) {
  return (
    <div
      className="chat-message"
      style={{
        alignSelf: currentUser ? "flex-end" : "flex-start",
      }}
    >
      {!currentUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div className="chatMessage_userImage">
            <img src={ProfilePicture} alt="" />
          </div>

          <div
            className="message_container"
            style={{
              backgroundColor: currentUser ? "#B2EBF2" : "white",
            }}
          >
            <p>Hey, Guys WhatsUpadsadasds</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="message_container"
            style={{
              backgroundColor: currentUser ? "#B2EBF2" : "white",
            }}
          >
            <p>
              Hey, Guys WhatsUpadsadasds a
              adasddasddadsadasdadadaasdadsadasdasdaddadadadasddassdasdasdadadsdasdasdasdadasdadsasdasdasdasdasdasdasdasdssdasdasdsdasdsadsads
            </p>
          </div>

          <div className="chatMessage_userImage">
            <img src={ProfilePicture} alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessage;

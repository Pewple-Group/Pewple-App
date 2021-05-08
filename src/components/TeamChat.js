import React, { useEffect, useState } from "react";
import "./TeamChat.css";
import AddMemberIcon from "../assets/add-user.svg";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ProfilePicture from "../assets/Dhruval.jpeg";
import db, { auth } from "../firebase";
import firebase from "firebase";
import Picker from "emoji-picker-react";
function TeamChat({ teamId }) {
  const [addNewMemberDialog, setAddNewMemberDialog] = useState(false);
  const [messages, setMessages] = useState([]);
  const [teamInfo, setteamInfo] = useState({});
  const sendMessage = (messageData) => {
    console.log(messageData);
    if (teamId) {
      let payload = {
        text: messageData.message,
        timeStamp: firebase.firestore.Timestamp.now(),
        senderEmail: auth.currentUser?.uid,
        photo: auth.currentUser?.photoURL,
        image: messageData.Images,
        video: messageData.Videos,
      };
      db.collection("Teams")
        .doc(teamId.slice(1))
        .collection("chats")

        .add(payload);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const data = await db
        .collection("Teams")
        .doc(teamId.slice(1))
        .collection("chats")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs);
        });
    };

    const getTeamInfo = async () => {
      const data = await db
        .collection("Teams")
        .doc(teamId.slice(1))
        .onSnapshot((snapshot) => {
          setteamInfo(snapshot.data());
        });
    };

    getMessages();
    getTeamInfo();
  }, []);

  return (
    <div className="Team-chatbox">
      <div className="Chat-Top">
        <div className="Chat-navtitle">
          <p>{teamInfo?.TeamName}</p>
        </div>
      </div>

      <div className="chatMessage-container">
        {messages.map((message) => (
          <ChatMessage
            text={message.data().text}
            userPhoto={message.data().photo}
            user={message.data().senderEmail}
            photo={message.data().image}
            messageDate={message.data().timeStamp}
            from="team"
            video={message.data().video}
          />
        ))}
      </div>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default TeamChat;

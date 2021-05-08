import React, { useEffect, useState } from "react";
import "./MessengerContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db, { auth } from "../firebase";
import firebase from "firebase";
function MessengerContainer({ userId, currentUser }) {
  const [userInfo, setUserInfo] = useState({});

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const user = await db
        .collection("users")
        .doc(userId)
        .onSnapshot((snapshot) => {
          setUserInfo(snapshot.data());
        });
    };

    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messagesdata = snapshot.docs.map((doc) => doc.data());

          const newMessage = messagesdata.filter(
            (message) =>
              message.sender === (currentUser?.id || userInfo?.id) ||
              message.reciver === (currentUser?.id || userInfo?.id)
          );

          setMessages(newMessage);
        });
    };

    getUser();
    getMessages();
  }, [userId]);

  const sendMessage = (messageData) => {
    let payload = {
      message: messageData.message,
      image: messageData.Images?.length > 0 ? messageData.Images : [],
      video: messageData.Videos?.length > 0 ? messageData.Videos : [],
      file: messageData.Files?.length > 0 ? messageData.Files : [],
      sender: messageData.sender,
      reciver: messageData.reciver,
      timeStamp: firebase.firestore.Timestamp.now(),
    };

    db.collection("chats")
      .doc(currentUser.id)
      .collection("messages")
      .add(payload);

    db.collection("chats").doc(userId).collection("messages").add(payload);
    db.collection("users")
      .doc(currentUser.id)
      .collection("recent")
      .doc(userId)
      .set({
        id: userId,
        message: messageData.message,
        name: userInfo.fullname,
        photo: userInfo.photo,
      });
    db.collection("users")
      .doc(userId)
      .collection("recent")
      .doc(currentUser.id)
      .set({
        id: currentUser.id,
        message: messageData.message,
        name: currentUser.fullname,
        photo: currentUser.photo,
      });
  };

  

  return (
    <div className="messenger__container">
      <div className="mc-navbar">
        <div className="mc-navbar-userimage">
          <img src={userInfo.photo} alt="" />
        </div>
        <div className="mc-navbar-username">
          <p>{userInfo.fullname}</p>
        </div>
      </div>
      <div className="mc-messages">
        {messages.map((message) => (
          <ChatMessage
            text={message.message}
            user={message.sender}
            photo={message.image}
            video={message.video}
            from="messenger"
            messageDate={message.timeStamp}
          />
        ))}
      </div>
      <div className="mc-ChatInput">
        <ChatInput from="messenger" sendMessage={sendMessage} userId={userId} />
      </div>
    </div>
  );
}

export default MessengerContainer;

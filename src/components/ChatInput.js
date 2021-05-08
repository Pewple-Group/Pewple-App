import React, { useRef } from "react";
import "./ChatInput.css";
import SendIcon from "../assets/send (1).svg";
import PaperClipIcon from "../assets/paperclip 1.svg";
import CodeIcon from "../assets/coding 1.svg";
import EmojiIcon from "../assets/grinning.svg";
import { TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { auth, storage } from "../firebase";
function ChatInput({ sendMessage, from, userId }) {
  const [emojiSwitch, setEmojiSwitch] = useState(false);
  const [messageData, setMessageData] = useState({
    message: "",
    Images: [],
    Videos: [],
    Files: [],
    sender: "",
    reciever: "",
  });

  let hiddenInputFile = useRef("");
  const send = (e) => {
    e.preventDefault();

    if (messageData.message.length > 0) {
      setMessageData({
        message: messageData.message,
        Files: messageData.files,
        Videos: messageData.videos,
        Images: messageData.Images,
        sender: auth.currentUser?.uid,
        reciver: userId,
      });
      sendMessage(messageData);
    }
    setMessageData({
      message: "",
      Files: [],
      Images: [],
      Videos: [],
      reciever: "",
      sender: "",
    });

    setEmojiSwitch(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageData({
      message: messageData.message + emojiObject.emoji,
      files: messageData.files,
      Images: messageData.Images,
      videos: messageData.videos,
      sender: auth.currentUser?.uid,
      reciver: userId,
    });
  };

  const handleClick = (event) => {
    hiddenInputFile.current.click();
  };

  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const date = Date.now();

    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/gif"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name + "-" + date.toString());

      await fileRef.put(file);
      alert("upload Complete");
      const imageLink = await fileRef.getDownloadURL();
      setMessageData({
        message: messageData.message,
        Files: messageData.files,
        Images: [...messageData.Images, imageLink],
        Videos: messageData.Videos,
        sender: auth.currentUser?.uid,
        reciver: userId,
      });

      console.log(messageData);
    } else if (
      file.type === "video/mp4" ||
      file.type === "video/webm" ||
      file.type === "video/avi" ||
      file.type === "video/mov"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name + "-" + date.toString());
      await fileRef.put(file);
      prompt("upload Complete");

      const videoLink = await fileRef.getDownloadURL();
      setMessageData({
        message: messageData.message,
        Files: messageData.files,
        Images: messageData.Images,
        Videos: [...messageData.Videos, videoLink],
        sender: auth.currentUser?.uid,
        reciver: userId,
      });
    } else {
      alert("different");
    }
  };

  console.log(messageData);
  return (
    <div className="chatInput">
      {emojiSwitch && (
        <Picker onEmojiClick={onEmojiClick} className="chatInput__emoji" />
      )}
      <div className="chatInput_container">
        <div className="chatInput_options">
          <img
            src={EmojiIcon}
            alt=""
            onClick={(e) => setEmojiSwitch(!emojiSwitch)}
          />
          <img
            src={PaperClipIcon}
            alt=""
            style={{ marginLeft: "15px" }}
            onClick={handleClick}
          />
          <input
            accept="image/*,video/*,.pdf,.doc,.docx,.exe,.rtf,.html,.js,.jsx,.c,.py,.css,.sass,.scss,.java"
            type="file"
            multiple={false}
            style={{ display: "none" }}
            ref={hiddenInputFile}
            onChange={(e) => {
              onFileSelect(e);
            }}
          />
        </div>

        <div className="chatInput_input">
          <TextareaAutosize
            placeholder="Type here..."
            value={messageData.message}
            onChange={(e) =>
              setMessageData({
                message: e.target.value,
                Files: messageData.Files,
                Images: messageData.Images,
                Videos: messageData.Videos,
                sender: auth.currentUser?.uid,
                reciver: userId,
              })
            }
          />
        </div>

        <div className="chatInput__sendbtn">
          <img src={SendIcon} alt="" onClick={send} />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;

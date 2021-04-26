import React from "react";
import "./ChatInput.css";
import SendIcon from "../assets/send (1).svg";
import PaperClipIcon from "../assets/paperclip 1.svg";
import CodeIcon from "../assets/coding 1.svg";
import EmojiIcon from "../assets/grinning.svg";
import { TextareaAutosize } from "@material-ui/core";
function ChatInput() {
  return (
    <div className="chatInput">
      <div className="chatInput_container">
        <div className="chatInput_options">
          <img src={EmojiIcon} alt="" />
          <img src={PaperClipIcon} alt="" style={{ marginLeft: "15px" }} />
          <img src={CodeIcon} alt="" />
        </div>

        <div className="chatInput_input">
          <TextareaAutosize placeholder="Type here..." />
        </div>

        <div className="chatInput__sendbtn">
          <img src={SendIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;

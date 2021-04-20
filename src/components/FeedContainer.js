import React, { useState } from "react";
import ProfilePicture from "../assets/Dhruval.jpeg";
import "./FeedContainer.css";
import DropDown from "../assets/Dropdown.svg";
import PublicIcon from "../assets/public.svg";
import EmojiIcon from "../assets/emoji.svg";
import GalleryIcon from "../assets/photo.svg";
import TextareaAutosize from "react-textarea-autosize";
import PostContainer from "./PostContainer";

function FeedContainer() {
  const [postInfo, setPostInfo] = useState("");

  return (
    <div className="FeedContainer">
      <div className="createPostContainer">
        <div className="userProfile">
          <img src={ProfilePicture} alt="" />
        </div>
        <div className="postInputContainer">
          <div className="InputContainer">
            <TextareaAutosize
              placeholder="what's Happening? "
              onChange={(e) => setPostInfo(e.target.value)}
              value={postInfo}
            />
            <div className="viewer-dropDown">
              <img src={PublicIcon} alt="" className="ViewersIcon" />
              <img src={DropDown} alt="" />
            </div>
          </div>

          <div className="createPostOptions">
            <div className="selectOptions">
              <img src={GalleryIcon} alt="" />
              <img src={EmojiIcon} alt="" />
            </div>
            <div className="post-btn">
              <button>Post</button>
            </div>
          </div>
        </div>
      </div>

      <div className="feed">
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>
    </div>
  );
}

export default FeedContainer;

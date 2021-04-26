import React, { useRef, useState } from "react";
import ProfilePicture from "../assets/Dhruval.jpeg";
import "./FeedContainer.css";

import PublicIcon from "../assets/public.svg";
import EmojiIcon from "../assets/emoji.svg";
import GalleryIcon from "../assets/photo.svg";
import TextareaAutosize from "react-textarea-autosize";
import PostContainer from "./PostContainer";
import PradhumanImage from "../assets/profile.jpg";
import FriendsLogo from "../assets/friends.svg";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
function FeedContainer() {
  const [postInfo, setPostInfo] = useState("");
  let dropdown = useRef("");
  const viewerOption = [
    {
      text: "Public",
      value: "Public",
      image: PublicIcon,
    },
    {
      text: "Friends",
      value: "Friends",
      image: FriendsLogo,
    },
  ];

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
              {/* <img src={PublicIcon} alt="" className="ViewersIcon" />
              <img src={DropDown} alt="" /> */}

              <Dropdown
                ref={dropdown}
                options={viewerOption}
                defaultValue={viewerOption[0].value}
              />
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
        <PostContainer
          userName="Dhruval Patel"
          userId="pd_gando"
          userImage={ProfilePicture}
        />
        <PostContainer
          userName="Pradhuman Patel"
          userId="pd_gando_2"
          userImage={PradhumanImage}
        />
      </div>
    </div>
  );
}

export default FeedContainer;

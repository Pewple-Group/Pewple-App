import React, { useEffect, useRef, useState } from "react";
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
import db, { auth, storage } from "../firebase";
import Picker from "emoji-picker-react";
import firebase from "firebase";
import { EmojiObjects } from "@material-ui/icons";
function FeedContainer({ user }) {
  const [postInfo, setPostInfo] = useState("");
  const [videoUrl, setVideoUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [postDetail, setPostDetail] = useState([]);
  const [emojiSwitch, setEmojiSwitch] = useState(false);
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

  const post = () => {
    if (postInfo.length > 0) {
      let lines = postInfo.split(/\n/);

      const postData = {
        description: lines,
        user: user.fullname,
        pictureProfile: user.photo,
        userEmail: user.email,
        videos: videoUrl.length > 0 ? videoUrl : [],
        images: imageUrl.length > 0 ? imageUrl : [],
        timestamp: firebase.firestore.Timestamp.now(),
      };
      db.collection("posts").add(postData);
      setPostInfo("");
    } else {
      alert("please fill in the blank");
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const posts = await db
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPostDetail(snapshot.docs);
        });
    };

    getPost();
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setPostInfo(postInfo + emojiObject.emoji);
  };

  const onFileSelect = async (file) => {
    const selectFile = file.target.files[0];
    if (
      selectFile.type === "image/png" ||
      selectFile.type === "image/jpeg" ||
      selectFile.type === "image/gif"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectFile.name);
      await fileRef.put(selectFile);
      const fileLink = await fileRef.getDownloadURL();
      setImageUrl((images) => [...images, fileLink]);
    } else if (
      selectFile.type === "video/mp4" ||
      selectFile.type === "video/webm" ||
      selectFile.type === "video/avi" ||
      selectFile.type === "video/mov"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectFile.name);
      await fileRef.put(selectFile);
      const fileLink = await fileRef.getDownloadURL();
      setVideoUrl((video) => [...video, fileLink]);
    }
  };

  return (
    <div className="FeedContainer">
      <div className="createPostContainer">
        <div className="userProfile">
          <img src={user?.photo} alt="" />
        </div>
        <div className="postInputContainer">
          <div className="InputContainer">
            <TextareaAutosize
              placeholder="what's Happening? "
              onChange={(e) => setPostInfo(e.target.value)}
              value={postInfo}
              required
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
              {/* <img src={GalleryIcon} alt="" /> */}
              <input
                type="file"
                className="file_input_btn"
                accept="image/*, video/*"
                onChange={(file) => {
                  onFileSelect(file);
                }}
              />
              <img
                src={EmojiIcon}
                alt=""
                onClick={(e) => setEmojiSwitch(!emojiSwitch)}
              />
            </div>
            <div className="post-btn">
              <button onClick={post}>Post</button>
            </div>
          </div>
        </div>

        {emojiSwitch && <Picker onEmojiClick={onEmojiClick} />}

        {(videoUrl.length > 0 || imageUrl.length > 0) && (
          <div className="display__image">
            {videoUrl?.map((video) => (
              <div
                className="video__cont"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <video src={video} alt="" width="100%" height="100%" controls />
              </div>
            ))}

            {imageUrl?.map((image) => (
              <div className="image__content">
                <img
                  src={image}
                  alt="some thing went wrong"
                  style={{
                    width: "100%",

                    imageRendering: "pixelated",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="feed">
        {postDetail.map((post) => (
          <PostContainer
            userEmail={post.data().userEmail}
            userImage={post.data().pictureProfile}
            userName={post.data().user}
            postDescription={post.data().description}
            postId={post.id}
            postLike={post.data().likes}
            postVideos={post.data().videos}
            postImages={post.data().images}
          />
        ))}
        {/* <PostContainer userName="Dhruval Patel" userImage={ProfilePicture} />
        <PostContainer userName="Pradhuman Patel" userImage={PradhumanImage} /> */}
      </div>
    </div>
  );
}

export default FeedContainer;

import React, { useEffect, useRef, useState } from "react";

import "./FeedContainer.css";

import EmojiIcon from "../assets/emoji.svg";
import GalleryIcon from "../assets/photo.svg";
import TextareaAutosize from "react-textarea-autosize";
import PostContainer from "./PostContainer";

import "semantic-ui-css/semantic.min.css";

import db, { auth, storage } from "../firebase";
import Picker from "emoji-picker-react";
import firebase from "firebase";

function FeedContainer({ user }) {
  const [postInfo, setPostInfo] = useState("");
  const [videoUrl, setVideoUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [postDetail, setPostDetail] = useState([]);
  const [emojiSwitch, setEmojiSwitch] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const inputFile = useRef("");

  const post = async () => {
    if (postInfo.length > 0) {
      let lines = postInfo.split(/\n/);

      const postData = {
        description: lines,

        userId: user.id,

        videos: videoUrl.length > 0 ? videoUrl : [],
        images: imageUrl.length > 0 ? imageUrl : [],
        timestamp: firebase.firestore.Timestamp.now(),
      };
      db.collection("posts").add(postData);
      setPostInfo("");
      setImageUrl([]);
      setVideoUrl([]);
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
    const getCurrentUser = async () => {
      const data = await db
        .collection("users")
        .doc(user.id)
        .onSnapshot((snapshot) => setActiveUser(snapshot.data()));
    };

    getPost();
    getCurrentUser();
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setPostInfo(postInfo + emojiObject.emoji);
  };

  const onFileSelect = async (file) => {
    const selectFile = file.target.files[0];
    const fileName = Date.now();
    console.log(fileName);
    if (
      selectFile.type === "image/png" ||
      selectFile.type === "image/jpeg" ||
      selectFile.type === "image/gif"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(fileName.toString());
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

  const handleClick = (event) => {
    inputFile.current.click();
  };

  return (
    <div className="FeedContainer">
      <div className="createPostContainer">
        <div className="createPost__info">
          <div className="userProfile">
            <img src={activeUser?.photo} alt="" />
          </div>
          <div className="postInputContainer">
            <div className="InputContainer">
              <TextareaAutosize
                placeholder="what's Happening? "
                onChange={(e) => setPostInfo(e.target.value)}
                value={postInfo}
                required
              />
            </div>

            <div className="createPostOptions">
              <div className="selectOptions">
                <img src={GalleryIcon} alt="" onClick={handleClick} />
                <input
                  type="file"
                  className="file_input_btn"
                  accept="image/*, video/*"
                  onChange={(file) => {
                    onFileSelect(file);
                  }}
                  style={{
                    display: "none",
                  }}
                  ref={inputFile}
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
            key={post.id}
            userId={post.data().userId}
            userEmail={post.data().userEmail}
            userImage={post.data().pictureProfile}
            userName={post.data().user}
            postDescription={post.data().description}
            postId={post.id}
            postLike={post.data().likes}
            postVideos={post.data().videos}
            postImages={post.data().images}
            currentUser={user}
          />
        ))}
        {/* <PostContainer userName="Dhruval Patel" userImage={ProfilePicture} />
        <PostContainer userName="Pradhuman Patel" userImage={PradhumanImage} /> */}
      </div>
    </div>
  );
}

export default FeedContainer;

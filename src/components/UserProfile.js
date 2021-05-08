import React, { useEffect, useRef } from "react";
import "./UserProfile.css";

import PostContainer from "./PostContainer";
import CloseIcon from "@material-ui/icons/Close";
import EmojiIcon from "../assets/emoji.svg";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from "@material-ui/core";
import { useState } from "react";
import Picker from "emoji-picker-react";
import db, { auth, storage } from "../firebase";
import EditIcon from "@material-ui/icons/Edit";
function UserProfile({ user, userId }) {
  const [editDialog, setEditDialog] = useState(false);
  const hiddenInputButtton = useRef(null);
  const [emojiSwitch, setEmojiSwitch] = useState(false);
  const [userDesc, setUserDesc] = useState({});
  const [postDetail, setPostDetail] = useState([]);
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const onEmojiClick = (event, emojiObject) => {
    setBio(bio + emojiObject.emoji);
  };
  const onEdit = (e) => {
    let lines = bio.split(/\n/);
    e.preventDefault();
    if (profession.length > 0 && bio.length > 0) {
      db.collection("users").doc(user.id).update({
        bio: lines,
        profession: profession,
      });

      setBio("");
      setProfession("");
      setEditDialog(false);
    } else {
      alert("Please Fill UP The Blank");
    }
  };

  useEffect(() => {
    const getUserBio = async () => {
      const data = await db
        .collection("users")
        .doc(userId)
        .onSnapshot((snapshot) => {
          setUserDesc(snapshot.data());
        });
    };

    const getPost = async () => {
      const posts = await db
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPostDetail(snapshot.docs);
        });
    };

    getPost();
    getUserBio();
  }, [userId]);

  const changeProfileImg = () => {
    hiddenInputButtton.current.click();
  };

  const onSelectImg = async (e) => {
    const file = e.target.files[0];
    const fileName = Date.now();
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(fileName.toString());
      await fileRef.put(file);
      const fileLink = await fileRef.getDownloadURL();
      auth.currentUser.updateProfile({
        photoURL: fileLink,
      });
      const newUser = {
        fullname: user.fullname,
        photo: fileLink,
        email: user.email,
        id: user.id,
      };
      db.collection("users").doc(user.id).update({
        photo: fileLink,
      });
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };
  return (
    <div className="user-Profile">
      <Dialog open={editDialog} maxWidth="sm" fullWidth={true}>
        <DialogTitle>
          <CloseIcon onClick={() => setEditDialog(false)} />
        </DialogTitle>
        <DialogContent>
          <div className="edit_UserInfo">
            <div className="user_profession">
              <p>Your Profession</p>
              <input
                type="text"
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
              />
            </div>
            <div className="user__bio">
              <p>Bio</p>
              <TextareaAutosize
                placeholder="Type Here ..."
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
            </div>

            <div className="user__options">
              {emojiSwitch && <Picker onEmojiClick={onEmojiClick} />}
              <img
                src={EmojiIcon}
                alt=""
                onClick={(e) => setEmojiSwitch(!emojiSwitch)}
              />
              <button onClick={onEdit}>Edit</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="user__info">
        <div
          className="user__image"
          onClick={
            user.id === userId
              ? () => {
                  changeProfileImg();
                }
              : null
          }
        >
          <img src={userDesc.photo} alt="" />

          {user.id === userId && <EditIcon />}
          <input
            type="file"
            ref={hiddenInputButtton}
            style={{ display: "none" }}
            onChange={onSelectImg}
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="user__name">
          <p>{userDesc.fullname}</p>
        </div>
        <div className="user__passion">
          <p>{userDesc.profession}</p>
        </div>

        <div className="user__description">
          {userDesc.bio?.map((_) => (
            <p>{_}</p>
          ))}
        </div>

        <div className="user__website_link">
          {/* <img src={LinkIcon} alt="" />
          <a href="https://pdpatel-portfolio.netlify.app/">{user.portfolio}</a> */}

          {user.id === userDesc.id && (
            <p onClick={() => setEditDialog(true)}>Edit</p>
          )}
        </div>
      </div>

      <div className="user__post">
        <div className="user_post_title">
          <p>Posts</p>
        </div>

        <div className="user__post__container">
          {postDetail
            .filter((post) => post.data().userId === userDesc.id)
            .map((post) => (
              <PostContainer
                key={post.id}
                userId={userDesc.id}
                postDescription={post.data().description}
                postId={post.id}
                postLike={post.data().likes}
                postVideos={post.data().videos}
                postImages={post.data().images}
                currentUser={user}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

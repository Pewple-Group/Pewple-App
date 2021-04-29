import React, { useEffect, useState } from "react";
import "./PostContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import CommentIcon from "../assets/comment.svg";
import HeartOneIcon from "../assets/heart.svg";
import HeartTwoIcon from "../assets/heart_1.svg";
import ShareIcon from "../assets/share.svg";

import CloseIcon from "@material-ui/icons/Close";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import PradhumanImage from "../assets/profile.jpg";
import TextareaAutosize from "react-textarea-autosize";
import EmojiIcon from "../assets/emoji.svg";
import GalleryIcon from "../assets/photo.svg";
import db, { auth } from "../firebase";
function PostContainer({
  userName,
  userId,
  postDescription,
  comments,
  userImage,
  userEmail,
  postImages,
  postVideos,
  postId,
}) {
  const [likesOnPost, setLikesOnPost] = useState({
    likes: [],
  });
  const [commentDialog, setCommentDialog] = useState(false);
  const [commentState, setCommentState] = useState({
    comments: 24,
  });

  const [likeState, setLikeState] = useState({
    like: likesOnPost?.length,
    likeActive: false,
  });
  const getLikes = async () => {
    const data = await db
      .collection("likes")
      .doc(postId)
      .onSnapshot((snapshot) => {
        setLikesOnPost(snapshot.data());
        setLikeState({
          like:
            snapshot.data()?.likes?.length > 0
              ? snapshot.data()?.likes?.length
              : 0,
          likeActive: snapshot.data()?.likes.includes(auth.currentUser.email),
        });
      });
  };
  useEffect(() => {
    getLikes();
  }, []);

  const HandleLike = async () => {
    if (likesOnPost?.likes.includes(auth.currentUser.email)) {
      const likepayload = {
        likes: likesOnPost?.likes.filter((_) => {
          return _ != auth.currentUser.email;
        }),
      };
      await db.collection("likes").doc(postId).set(likepayload);
      setLikesOnPost({
        likes: likepayload?.likes,
      });
    } else {
      const likepayload = {
        likes: [...likesOnPost?.likes, auth.currentUser.email],
      };
      await db.collection("likes").doc(postId).set(likepayload);
      setLikesOnPost({
        likes: likepayload?.likes,
      });
    }

    // const likepayload = {
    //   likes: likesOnPost.likes.includes(auth.currentUser.email)
    //     ? likesOnPost.likes.filter((_) => {
    //         return _ != auth.currentUser.email;
    //       })
    //     : [...likesOnPost.likes, auth.currentUser.email],
    // };
    // db.collection("likes").doc(postId).set(likepayload);

    // console.log(likeState);
  };

  return (
    <div className="post_container">
      <Dialog open={commentDialog} maxWidth="sm" fullWidth={true}>
        <DialogTitle>
          <CloseIcon onClick={(e) => setCommentDialog(false)} />
        </DialogTitle>
        <DialogContent>
          <div className="commentDialog_post">
            <div className="dialog_post_user">
              <div className="dialog_post_user_image">
                <img src={ProfilePicture} alt="" />
              </div>
              <div className="commentDialog_post_user_info">
                <p className="commentDialog_post_userFullname">Dhruval Patel</p>
              </div>
            </div>

            <div className="commentDialog_post_description"></div>
          </div>

          <div className="commentDialog__comment">
            <div className="commentDialog_currentUser">
              <div className="commentDialog_currentUserImage">
                <img src={PradhumanImage} alt="" />
              </div>
            </div>
            <div className="commentDialog_commentInput">
              <TextareaAutosize placeholder="Comment Here" />
            </div>
          </div>
          <div className="commentDialog_commentOptions">
            <div className="commentDialog_options_container">
              <img src={GalleryIcon} alt="" />
              <img src={EmojiIcon} alt="" />
            </div>

            <div className="commentDialog_commentReplybtn">
              <button>Reply</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="post_user">
        <div className="post_userImage">
          <img src={userImage} alt="" />
        </div>
        <div className="post_userInfo">
          <p className="post_userFullName">{userName}</p>
        </div>
      </div>

      <div className="post_description">
        {postDescription?.map((_) => (
          <pre>{`${_}`}</pre>
        ))}
      </div>

      {(postImages.length > 0 || postVideos.length > 0) && (
        <div className="post__media__file">
          {postImages?.map((image) => (
            <div className="media__container">
              <img src={image} alt="" />
            </div>
          ))}
          {postVideos?.map((video) => (
            <div className="media__container">
              <video src={video} width="100%" height="100%" controls />
            </div>
          ))}
        </div>
      )}

      <div className="post_options">
        <div className="option_section">
          <img
            src={CommentIcon}
            onClick={() => setCommentDialog(true)}
            alt=""
          />
          <p>{commentState.comments}</p>
        </div>

        <div className="option_section">
          {likeState.likeActive ? (
            <img
              src={HeartTwoIcon}
              onClick={(e) => HandleLike(likesOnPost)}
              alt=""
            />
          ) : (
            <img
              src={HeartOneIcon}
              onClick={(e) => HandleLike(likesOnPost)}
              alt=""
            />
          )}

          <p>{likeState.like}</p>
        </div>
        <div className="option_section">
          <img src={ShareIcon} alt="" />
        </div>
      </div>

      <div className="recent_comment"></div>
    </div>
  );
}

export default PostContainer;

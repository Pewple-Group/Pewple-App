import React, { useState } from "react";
import "./PostContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import CommentIcon from "../assets/comment.svg";
import HeartOneIcon from "../assets/heart.svg";
import HeartTwoIcon from "../assets/heart_1.svg";
import ShareIcon from "../assets/share.svg";
import CommentContainer from "./CommentContainer";
function PostContainer({ userName, userId, postDescription, comments }) {
  const [likeState, setLikeState] = useState({
    like: 24,
    likeActive: false,
  });

  const HandleLike = () => {
    setLikeState({
      likeActive: !likeState.likeActive,

      like: likeState.likeActive ? likeState.like - 1 : likeState.like + 1,
    });
  };
  return (
    <div className="post_container">
      <div className="post_user">
        <div className="post_userImage">
          <img src={ProfilePicture} alt="" />
        </div>
        <div className="post_userInfo">
          <p className="post_userFullName">{userName}</p>
          <p className="post_userName">{userId}</p>
        </div>
      </div>

      <div className="post_description">
        <pre>{`I've been developing for 20+ years.

I've seen tech come and go.

JavaScript stays.`}</pre>
      </div>

      <div className="post_options">
        <div className="option_section">
          <img src={CommentIcon} alt="" />
          <p>23</p>
        </div>

        <div className="option_section">
          {likeState.likeActive ? (
            <img src={HeartTwoIcon} onClick={HandleLike} alt="" />
          ) : (
            <img src={HeartOneIcon} onClick={HandleLike} alt="" />
          )}

          <p>{likeState.like}</p>
        </div>
        <div className="option_section">
          <img src={ShareIcon} alt="" />
        </div>
      </div>

      <div className="recent_comment">
        <CommentContainer />
      </div>
    </div>
  );
}

export default PostContainer;

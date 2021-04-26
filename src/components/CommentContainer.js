import React from "react";
import ProfilePicture from "../assets/Dhruval.jpeg";
import "./CommentContainer.css";
import HeartOneIcon from "../assets/heart.svg";
import HeartTwoIcon from "../assets/heart_1.svg";
import ShareIcon from "../assets/share.svg";
import CommentIcon from "../assets/comment.svg";

function CommentContainer() {
  return (
    <div className="comment_container">
      <div className="comment_user">
        <div className="comment_userImage">
          <img src={ProfilePicture} alt="" />
        </div>
        <div className="comment_userInfo">
          <p className="comment_userFullName">Dhruval Patel</p>
          <p className="comment_userName">@pd_06_07_2001</p>
        </div>
      </div>

      <div className="comment_description">
        <p>
          Python will stay longer considering its extensive use in growing tech
          like Data Science & AI.
        </p>
      </div>

      <div className="comment_options">
        <div className="comment_option_section">
          <img src={HeartOneIcon} alt="" />
          <p>23</p>
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;

import React from "react";
import "./UserProfile.css";
import PradhumanImage from "../assets/profile.jpg";
import LinkIcon from "../assets/link.svg";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PostContainer from "./PostContainer";
function UserProfile() {
  return (
    <div className="user-Profile">
      <div className="user__info">
        <div className="user__image">
          <img src={PradhumanImage} alt="" />
        </div>
        <div className="user__name">
          <p>Pradhuman Patel</p>
        </div>
        <div className="user__passion">
          <p>Web Developer</p>
        </div>

        <div className="user__description">
          <p>
            A passionate Full Stack Software Developer 🚀 having an little bite
            experience of designing and building Web and Mobile applications
            with JavaScript / Reactjs / Nodejs and some other cool libraries and
            frameworks.
          </p>
        </div>

        <div className="user__website_link">
          <img src={LinkIcon} alt="" />
          <a href="https://pdpatel-portfolio.netlify.app/">
            pdpatel-portfolio.netlify.app
          </a>

          <p>Edit</p>
        </div>
      </div>

      <div className="user__post">
        <div className="user_post_title">
          <p>Posts</p>
        </div>

        <div className="user__post__container">
          <PostContainer
            userName="Dhruval Patel"
            userId="pd_gando"
            userImage={ProfilePicture}
          />

          <PostContainer
            userName="Dhruval Patel"
            userId="pd_gando"
            userImage={ProfilePicture}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

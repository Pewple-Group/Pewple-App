import React, { useState } from "react";
import "./PostContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import CommentIcon from "../assets/comment.svg";
import HeartOneIcon from "../assets/heart.svg";
import HeartTwoIcon from "../assets/heart_1.svg";
import ShareIcon from "../assets/share.svg";
import CommentContainer from "./CommentContainer";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import PradhumanImage from "../assets/profile.jpg";
import TextareaAutosize from "react-textarea-autosize";
import EmojiIcon from "../assets/emoji.svg";
import GalleryIcon from "../assets/photo.svg";
function PostContainer({
  userName,
  userId,
  postDescription,
  comments,
  userImage,
}) {
  const [likeState, setLikeState] = useState({
    like: 24,
    likeActive: false,
  });
  const [commentDialog, setCommentDialog] = useState(false);
  const [commentState, setCommentState] = useState({
    comments: 24,
  });
  const HandleLike = () => {
    setLikeState({
      likeActive: !likeState.likeActive,

      like: likeState.likeActive ? likeState.like - 1 : likeState.like + 1,
    });
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
                <p className="commentDialog_post_userName">@pd_26072001</p>
              </div>
            </div>

            <div className="commentDialog_post_description">
              <pre>{`I've been developing for 20+ years.

I've seen tech come and go.

JavaScript stays.`}</pre>
            </div>
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
          <p className="post_userName">@{userId}</p>
        </div>
      </div>

      <div className="post_description">
        <pre>{`I've been developing for 20+ years.

I've seen tech come and go.

JavaScript stays.`}</pre>
      </div>

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

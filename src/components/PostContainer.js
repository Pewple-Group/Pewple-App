import React, { useEffect, useState } from "react";
import "./PostContainer.css";

import CommentIcon from "../assets/comment.svg";
import HeartOneIcon from "../assets/heart.svg";
import HeartTwoIcon from "../assets/heart_1.svg";
import ShareIcon from "../assets/share.svg";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import TextareaAutosize from "react-textarea-autosize";

import db, { auth } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

import firebase from "firebase";
import CommentContainer from "./CommentContainer";

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
  currentUser,
}) {
  const [likesOnPost, setLikesOnPost] = useState({
    likes: [],
  });
  const [comment, setComment] = useState("");
  const [commentDialog, setCommentDialog] = useState(false);
  const [commentOnPost, setCommentOnPost] = useState([]);
  const [commentState, setCommentState] = useState({
    comments: commentOnPost?.length > 0 ? commentOnPost?.length : 0,
  });
  const [activeUser, setActiveUser] = useState();

  const [likeState, setLikeState] = useState({
    like: likesOnPost?.likes.length > 0 ? likesOnPost?.likes.length : 0,
    likeActive: false,
  });
  const getLikes = async () => {
    const data = await db
      .collection("likes")
      .doc(postId)
      .onSnapshot((snapshot) => {
        if (snapshot.data() !== undefined) {
          setLikesOnPost(snapshot.data());
        }

        setLikeState({
          like: snapshot.data()?.likes?.length
            ? snapshot.data()?.likes?.length
            : 0,
          likeActive: snapshot.data()?.likes.includes(auth.currentUser?.email),
        });
      });
  };

  const getComments = async () => {
    const data = await db
      .collection("posts")
      .doc(postId)
      .collection("Comments")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setCommentOnPost(snapshot.docs);

        setCommentState({
          comments: snapshot.docs.length,
        });
      });
  };

  const getUser = async () => {
    const data = await db
      .collection("users")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setActiveUser(snapshot.data());
      });
  };
  useEffect(() => {
    getLikes();
    getComments();
    getUser();
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
        likes: likepayload.likes,
      });
    } else {
      const likepayload = {
        likes: [...likesOnPost?.likes, auth.currentUser.email],
      };
      await db.collection("likes").doc(postId).set(likepayload);
      setLikesOnPost({
        likes: likepayload.likes,
      });
    }
  };

  const handleComment = async () => {
    if (comment.length > 0) {
      let lines = comment.split(/\n/);
      let payload = {
        timeStamp: firebase.firestore.Timestamp.now(),
        comment: lines,
        userName: currentUser?.fullname,
        email: currentUser?.email,
        id: currentUser?.id,
        photo: currentUser?.photo,
      };

      db.collection("posts").doc(postId).collection("Comments").add(payload);
      setComment("");
      setCommentDialog(false);
    } else {
      alert("please Fill up the blank");
    }
  };
  const history = useHistory();
  const gotoUser = (userId) => {
    if (userId) {
      history.push(`/profile:${userId}`);
    }
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
                <img src={activeUser?.photo} alt="" />
              </div>
              <div className="commentDialog_post_user_info">
                <p className="commentDialog_post_userFullname">
                  {activeUser?.fullname}
                </p>
              </div>
            </div>

            <div className="commentDialog_post_description">
              {postDescription?.map((_) => (
                <p>{_}</p>
              ))}

              {(postImages?.length > 0 || postVideos?.length > 0) && (
                <div
                  className="media__carousel"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "50px",

                    alignSelf: "center",
                  }}
                >
                  <Carousel
                    style={{
                      height: "100%",
                      width: "100%",

                      display: "flex",
                      alignItems: "center",
                    }}
                    indicators={false}
                  >
                    {postImages?.map((image) => (
                      <Carousel.Item
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <img
                          src={image}
                          alt=""
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </Carousel.Item>
                    ))}
                    {postVideos?.map((video) => (
                      <Carousel.Item
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <video
                          src={video}
                          controls
                          width="200px"
                          height="200px"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}
            </div>
          </div>

          <div className="commentDialog__comment">
            <div className="commentDialog_currentUser">
              <div className="commentDialog_currentUserImage">
                <img src={currentUser.photo} alt="" />
              </div>
            </div>
            <div className="commentDialog_commentInput">
              <TextareaAutosize
                placeholder="Comment Here"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
            </div>
          </div>
          <div className="commentDialog_commentOptions">
            <div className="commentDialog_commentReplybtn">
              <button onClick={handleComment}>Reply</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="post_user" onClick={() => gotoUser(userId)}>
        <div className="post_userImage">
          <img src={activeUser?.photo} alt="" />
        </div>
        <div className="post_userInfo">
          <p className="post_userFullName">{activeUser?.fullname}</p>
        </div>
      </div>

      <div className="post_description">
        {postDescription?.map((_) => (
          <p>{_}</p>
        ))}
      </div>

      {/* {(postImages.length > 0 || postVideos.length > 0) && (
        <div className="post__media__file">
          {postImages?.map((image) => (
            <div className="media__container">
              <img src={image} alt="" />
            </div>
          ))}
          {postVideos?.map((video) => (
            <div className="media__container">
              <video src={video} controls />
            </div>
          ))}
        </div>
      )} */}

      {(postImages?.length > 0 || postVideos?.length > 0) && (
        <div
          className="media__carousel"
          style={{
            width: "300px",
            height: "300px",
            marginBottom: "50px",

            alignSelf: "center",
          }}
        >
          <Carousel
            style={{
              height: "100%",
              width: "100%",

              display: "flex",
              alignItems: "center",
            }}
            indicators={false}
          >
            {postImages?.map((image) => (
              <Carousel.Item
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src={image}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </Carousel.Item>
            ))}
            {postVideos?.map((video) => (
              <Carousel.Item
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <video src={video} controls width="300px" height="300px" />
              </Carousel.Item>
            ))}
          </Carousel>
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

      <div className="recent_comment">
        {commentOnPost?.length > 0 && (
          <CommentContainer
            name={commentOnPost[0].data().userName}
            photo={commentOnPost[0].data().photo}
            comment={commentOnPost[0].data().comment}
            id={commentOnPost[0].data().id}
          />
        )}
      </div>
    </div>
  );
}

export default PostContainer;

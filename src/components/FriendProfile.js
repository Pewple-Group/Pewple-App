import React from "react";
import "./FriendProfile.css";
import CheckedIcon from "../assets/checked.svg";
import DustBinIcon from "../assets/dustbin.svg";
import { useHistory } from "react-router";
import sendIcon from "../assets/send.svg";
function FriendProfile({
  name,
  message,
  friendsImage,
  userName,
  isRecent,
  isSuggestion,
  isSearch,
  makeFriends,
  email,
  id,
  from,
  friendList,
}) {
  const history = useHistory();
  const gotoUser = (friendId) => {
    if (friendId) {
      history.push(`/messenger:${friendId}`);
    }
  };

  return (
    <div
      className="friendsProfile"
      onClick={from === "messenger" ? () => gotoUser(id) : null}
      style={{
        display: "flex",
        flexDirection: from === "messenger" ? "column" : "row",
        justifyContent:
          from === "suggestion"
            ? "space-between"
            : from === "nav"
            ? "space-between"
            : "center",
      }}
    >
      <div
        className="friends_detail"
        onClick={() => (from === "nav" ? history.push(`/profile:${id}`) : null)}
      >
        <div className="friend-image">
          <img src={friendsImage} alt="" />
        </div>
        <div className="friends_info">
          <p className="friends_name">{name}</p>
        </div>
      </div>
      {isSuggestion && (
        <div className="friendRequestOptions">
          <img
            src={CheckedIcon}
            alt=""
            onClick={() => {
              let friendDetail = {
                id: id,
                email: email,
                photo: friendsImage,
                name: name,
              };

              makeFriends(friendDetail);
            }}
          />
        </div>
      )}

      {isSearch && !friendList.includes(id) ? (
        <div className="friendRequestOptions">
          <img
            src={CheckedIcon}
            alt=""
            onClick={() => {
              let friendDetail = {
                id: id,
                email: email,
                photo: friendsImage,
                name: name,
              };

              makeFriends(friendDetail);
            }}
          />
        </div>
      ) : isSearch ? (
        <div className="friendRequestOptions">
          <img
            src={sendIcon}
            alt=""
            onClick={() => {
              history.push(`/messenger:${id}`);
            }}
          />
        </div>
      ) : (
        <></>
      )}

      {isRecent && (
        <div className="friend__message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default FriendProfile;

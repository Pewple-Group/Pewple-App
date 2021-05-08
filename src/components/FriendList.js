import React, { useEffect, useState } from "react";
import "./FriendList.css";
import ProfilePicture from "../assets/Dhruval.jpeg";

import RemoveUserIcon from "../assets/remove-user.svg";
import sendIcon from "../assets/send.svg";
import db, { auth } from "../firebase";
import { useHistory } from "react-router";
function FriendList() {
  const [listOfFriends, setListOfFriends] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getFriends = async () => {
      const friends = await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("friendsList")
        .onSnapshot((snapshot) => {
          setListOfFriends(snapshot.docs);
        });
    };
    getFriends();
  }, [auth.currentUser]);

  const removeFriend = (friendId) => {
    console.log(friendId);

    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("friendsList")
      .doc(friendId)
      .delete();
  };

  const gotoUser = (userId) => {
    if (userId) {
      history.push(`/profile:${userId}`);
    }
  };
  return (
    <div className="friend-list">
      <div className="friendlist_navbar">
        <div className="friendlist_navbarTitle">
          <p>Friends-List</p>
        </div>
      </div>

      <div className="friendlist-container">
        {listOfFriends?.map((friend) => (
          <div className="friends_container">
            <div
              className="friendsContainer_details"
              onClick={() => gotoUser(friend.data().id)}
            >
              <div className="friendslist_friendsImage">
                <img src={friend.data().photo} alt="" />
              </div>
              <div className="friendslist_friendsInfo">
                <p className="friendsList_friendsName">{friend.data().name}</p>
                <p className="friendslist_friendsUserName">
                  {friend.data().email}
                </p>
              </div>
            </div>

            <div className="friendContainer_option">
              <img
                src={sendIcon}
                alt=""
                onClick={() => {
                  history.push(`/messenger:${friend.id}`);
                }}
              />
              <img
                src={RemoveUserIcon}
                alt=""
                onClick={() => {
                  removeFriend(friend.data().id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendList;

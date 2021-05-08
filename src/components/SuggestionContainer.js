import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import "./SuggestionContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
import db, { auth } from "../firebase";

function SuggestionContainer() {
  const [suggestUsers, setSuggestUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [friendEmail, setFriendEmail] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await db.collection("users").onSnapshot((snapshot) => {
        setSuggestUsers(snapshot.docs);
      });
    };

    const getFriends = async () => {
      const friends = await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("friendsList")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
          setFriendEmail(snapshot.docs.map((doc) => doc.data().email));
        });
    };
    getUsers();
    getFriends();
  }, []);

  const makeFriends = async (friendDetail) => {
    await db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("friendsList")
      .doc(friendDetail.id)
      .set(friendDetail);
  };

  return (
    <div className="suggestion">
      <div className="suggestion-glass">
        <div className="suggestion_title">
          <p>Suggestion</p>
        </div>

        <div className="FriendsList">
          {suggestUsers
            .filter(
              (user) =>
                user.data().email != auth.currentUser?.email &&
                !friendEmail.includes(user.data().email)
            )
            .map((user) => (
              <FriendProfile
                id={user.id}
                name={user.data().fullname}
                friendsImage={user.data().photo}
                isSuggestion={true}
                makeFriends={makeFriends}
                email={user.data().email}
                from="suggestion"
                isSearch={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestionContainer;

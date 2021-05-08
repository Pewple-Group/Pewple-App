import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import "./SecondContainer.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
import db from "../firebase";
function SecondContainer({ title, isRecent, isSuggestion, user }) {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    const getRecent = async () => {
      const data = await db
        .collection("users")
        .doc(user.id)
        .collection("recent")
        .onSnapshot((snapshot) => {
          setRecent(snapshot.docs);
        });
    };

    getRecent();
  }, []);
  return (
    <div className="recent">
      <div className="recent-glass">
        <div className="recent_title">
          <p>{title}</p>
        </div>

        <div className="FriendsList">
          {recent?.map((_) => (
            <FriendProfile
              name={_?.data().name}
              id={_.id}
              friendsImage={_?.data().photo}
              from="messenger"
              isRecent={true}
              message={_.data().message}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondContainer;

import React, { useEffect, useState } from "react";

import "./CommentContainer.css";
import { useHistory } from "react-router-dom";
import db from "../firebase";

function CommentContainer({ name, photo, comment, id }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await db
        .collection("users")
        .doc(id)
        .onSnapshot((snapshot) => setUser(snapshot.data()));
    };
    getCurrentUser();
  }, []);

  const gotoUser = (userId) => {
    if (userId) {
      history.push(`/profile:${userId}`);
    }
  };

  return (
    <div className="comment_container">
      <div className="comment_user" onClick={() => gotoUser(id)}>
        <div className="comment_userImage">
          <img src={user?.photo} alt="" />
        </div>

        <p className="comment_userFullName">{name}</p>
      </div>

      <div className="comment_description">
        {comment.map((_) => (
          <p>{`${_}`}</p>
        ))}
      </div>
    </div>
  );
}

export default CommentContainer;

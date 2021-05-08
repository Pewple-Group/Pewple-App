import { FastfoodOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import MessengerLogo from "../assets/send.svg";
import db, { auth } from "../firebase";
import FriendProfile from "./FriendProfile";
import "./NavBar.css";
function NavBar({ title, CurrentUser }) {
  const history = useHistory();
  const [usersList, setUserslist] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const users = await db.collection("users").onSnapshot((snapshot) => {
        setUserslist(snapshot.docs);
      });
    };
    const getFriends = async () => {
      const friends = await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("friendsList")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs.map((doc) => doc.data().id));
        });
    };
    getUsers();
    getFriends();
  }, []);
  const searchUser = usersList.filter((user) => {
    if (searchInput && user.data().fullname !== CurrentUser?.fullname) {
      if (
        //  roy patel                                       patel
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });
  const makeFriends = (friendDetail) => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("friendsList")
      .doc(friendDetail.id)
      .set(friendDetail);
  };

  return (
    <div className="navbar">
      <div className="navbar_title">
        <p>{title}</p>
      </div>

      <div className="navbar-searchContainer">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        {searchUser.length > 0 && (
          <div className="searched__User">
            {searchUser.map((user) => (
              <FriendProfile
                id={user.id}
                name={user.data().fullname}
                friendsImage={user.data().photo}
                email={user.data().email}
                from="nav"
                isSearch={true}
                makeFriends={makeFriends}
                friendList={friendList}
              />
            ))}
          </div>
        )}
      </div>
      <Link to="/messenger">
        <div className="navbar-messenger-btn">
          <div className="messenger-logo">
            <img src={MessengerLogo} alt="" />
          </div>
          <p>Messenger</p>
        </div>
      </Link>
    </div>
  );
}

export default NavBar;

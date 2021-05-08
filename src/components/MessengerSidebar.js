import React, { useEffect, useState } from "react";
import "./MessengerSidebar.css";
import BackIcon from "../assets/back.svg";
import FriendProfile from "./FriendProfile";
import db from "../firebase";
import { useHistory } from "react-router";

function MessengerSidebar({ user }) {
  const [friendlist, setFriendList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [recent, setRecent] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const getFriends = async () => {
      const friends = await db
        .collection("users")
        .doc(user.id)
        .collection("friendsList")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };

    const getRecent = async () => {
      const data = await db
        .collection("users")
        .doc(user.id)
        .collection("recent")
        .onSnapshot((snapshot) => {
          setRecent(snapshot.docs);
        });
    };
    const getCurrentUser = async () => {
      const data = await db
        .collection("users")
        .doc(user.id)
        .onSnapshot((snapshot) => setActiveUser(snapshot.data()));
    };
    getCurrentUser();

    getFriends();
    getRecent();
  }, []);

  const searching = (e) => {
    setSearchInput(e.target.value);
  };

  const searchItem = friendlist.filter((data) => {
    if (searchInput) {
      if (data.data().name.toLowerCase().includes(searchInput.toLowerCase())) {
        return data;
      }
    }
  });

  const item = searchItem.map((data) => {
    return (
      <FriendProfile
        name={data?.data().name}
        id={data.id}
        friendsImage={data?.data().photo}
        from="messenger"
        isSearch={false}
      />
    );
  });

  return (
    <div className="messenger_sidebar">
      <div className="ms-UserProfile">
        <div className="back__btn" onClick={() => history.push("/")}>
          <img src={BackIcon} alt="hello" />
        </div>

        <div className="ms-profile-info">
          <div className="ms-profile-img">
            <img src={activeUser?.photo} alt="" />
          </div>
          <div className="ms-profile__name__info">
            <p className="ms-profile-fullname">{activeUser?.fullname}</p>
            <p className="ms-profile-username">{activeUser?.email}</p>
          </div>
        </div>
      </div>

      <div className="ms_searchBar">
        <input
          type="text"
          placeholder="Search Here ..."
          onChange={searching}
          value={searchInput}
        />
      </div>

      <div className="ms_friendlist">
        {item.length > 0 ? (
          item
        ) : (
          <div className="friends__lists">
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
        )}
      </div>
    </div>
  );
}

export default MessengerSidebar;

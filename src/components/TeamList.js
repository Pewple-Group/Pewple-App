import React, { useEffect, useState } from "react";
import "./TeamList.css";
import addIcon from "../assets/plus.svg";
import TeamProfile from "./TeamProfile";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ProfilePicture from "../assets/Dhruval.jpeg";
import PradhumanImage from "../assets/profile.jpg";
import db, { auth } from "../firebase";
import firebase from "firebase";
import { DvrTwoTone } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
function TeamList() {
  const [createNewTeamDialog, setCreateNewTeamDialog] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [friendList, setFirendList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [teamID, setTeamID] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const getFriends = async () => {
      const friends = await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("friendsList")
        .onSnapshot((snapshot) => {
          setFirendList(snapshot.docs);
        });
    };

    const getTeams = async () => {
      const teams = await db.collection("Teams").onSnapshot((snapshot) => {
        setTeamList(snapshot.docs);
        snapshot.docs.map((doc) => {
          setTeamID([...teamID, doc.id]);
        });
      });
    };

    getFriends();
    getTeams();
  }, []);

  const createTeam = () => {
    if (!teamID.includes(teamId)) {
      if (teamName.length > 0 && projectName.length > 0 && teamId.length > 0) {
        const payload = {
          TeamName: teamName,
          TeamId: teamId,
          ProjectName: projectName,
          timeStamp: firebase.firestore.Timestamp.now(),
          memberList: [...memberList, auth.currentUser?.uid],
          leader: auth.currentUser?.displayName,
        };
        db.collection("Teams").doc(teamId).set(payload);
        setTeamName("");
        setProjectName("");
        setTeamId("");
        setMemberList([]);
        setCreateNewTeamDialog(false);
      } else {
        alert("Plesase Fill up all the info");
      }
    } else {
      alert("There is already a team with this id..");
    }
  };

  const deleteTeam = (teamDetail) => {
    if (teamDetail.leader === auth.currentUser?.displayName) {
      db.collection("Teams").doc(teamDetail.id).delete();
    } else {
      alert("You are not authorized to delete this team");
    }
  };

  const gotoTeam = (id) => {
    if (id) {
      history.push(`/team:${id}`);
    }
  };

  const onSelectMember = (e, friendDetail) => {
    if (e.target.checked) {
      setMemberList([...memberList, friendDetail.id]);
    } else if (!e.target.checked) {
      setMemberList(memberList.filter((user) => user != friendDetail.id));
    }
  };

  return (
    <div className="team-list">
      <Dialog open={createNewTeamDialog} maxWidth="sm" fullWidth={true}>
        <DialogTitle>
          <CloseIcon onClick={(e) => setCreateNewTeamDialog(false)} />
        </DialogTitle>

        <DialogContent>
          <div className="newTeam_container">
            <div className="newteam_detail">
              <div className="newTeam_nameInput">
                <p>Team Name</p>
                <input
                  type="text"
                  placeholder="Piped Pipers"
                  onChange={(e) => setTeamName(e.target.value)}
                  value={teamName}
                />
              </div>

              <div className="newTeam_projectNameInput">
                <p>Project Name</p>
                <input
                  type="text"
                  placeholder="Social Media App"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                />
              </div>
            </div>

            <div className="newTeam__teamIdInput">
              <p>Team Id</p>
              <input
                type="text"
                placeholder="@pipedPier123"
                onChange={(e) => setTeamId(e.target.value)}
                value={teamId}
              />
            </div>

            <div className="newTeam_selectMember">
              <p className="Select_memberTitle">Select Member For your team.</p>

              <div className="member_container">
                {friendList.map((friend) => (
                  <div className="newTeamMember_container" key={friend.id}>
                    <div className="memberDetail">
                      <div className="member_image">
                        <img src={friend.data().photo} alt="" />
                      </div>
                      <div className="member_info">
                        <p
                          className="member_name"
                          style={{ textTransform: "capitalize" }}
                        >
                          {friend.data().name}
                        </p>
                        <p className="member_userName">{friend.data().email}</p>
                      </div>
                    </div>

                    <div className="member_selectedMark">
                      <input
                        type="checkbox"
                        name="member"
                        id="member"
                        onChange={(e) => {
                          let friendDetail = {
                            name: friend.data().name,
                            email: friend.data().email,
                            photo: friend.data().photo,
                            id: friend.id,
                          };

                          onSelectMember(e, friendDetail);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="createTeambtn">
                <button
                  className="cancelbtn"
                  onClick={(e) => {
                    setCreateNewTeamDialog(false);
                    setTeamName("");
                    setProjectName("");
                    setTeamId("");
                    setMemberList([]);
                  }}
                >
                  Cancel
                </button>
                <button className="createbtn" onClick={(e) => createTeam()}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="teamlist_navbar">
        <div
          className="create_new_team_btn"
          onClick={(e) => setCreateNewTeamDialog(true)}
        >
          <img src={addIcon} alt="" />
          <p>Create Team</p>
        </div>
      </div>
      <div className="teamlistContainer">
        {teamList
          .filter((team) =>
            team.data().memberList.includes(auth.currentUser.uid)
          )
          .map((team, teamIndex) => (
            <TeamProfile
              teamName={team.data().TeamName}
              projectName={team.data().ProjectName}
              LeaderName={team.data().leader}
              SrNo={teamIndex}
              deleteTeam={deleteTeam}
              id={team.data().TeamId}
              gotoTeam={gotoTeam}
            />
          ))}
      </div>
    </div>
  );
}

export default TeamList;

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import FriendsPage from "./Pages/FriendsPage";
import FileManager from "./Pages/FileManager";
import TeamPage from "./Pages/TeamPage";
import Teams from "./Pages/Teams";
import ProfilePage from "./Pages/ProfilePage";
import Messenger from "./Pages/Messenger";
import { useState } from "react";
import { auth } from "./firebase";
// https://pewple-app.firebaseapp.com/__/auth/handler
function App() {
  const [signUp, setSignUp] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="App">
      <Router>
        {!user && signUp ? (
          <SignUp setSignUp={setSignUp} />
        ) : !user && !signUp ? (
          <Login setUser={setUser} setSignUp={setSignUp} />
        ) : (
          <Switch>
            <Route path="/friends">
              <FriendsPage signOut={signOut} user={user} />
            </Route>
            <Route path="/teams">
              <Teams signOut={signOut} user={user} />
            </Route>

            <Route path={`/team:teamId`}>
              <TeamPage signOut={signOut} user={user} />
            </Route>
            <Route path="/file:userId">
              <FileManager signOut={signOut} user={user} />
            </Route>
            <Route path="/profile:userId">
              <ProfilePage signOut={signOut} user={user} />
            </Route>
            <Route path="/post:post">
              <Messenger user={user} />
            </Route>
            <Route path="/messenger">
              <Messenger user={user} />
            </Route>
            <Route path="/messenger:userId">
              <Messenger user={user} />
            </Route>
            <Route path="/">
              <Home signOut={signOut} user={user} />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;

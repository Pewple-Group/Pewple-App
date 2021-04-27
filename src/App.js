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
// https://pewple-app.firebaseapp.com/__/auth/handler
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/friends">
            <FriendsPage />
          </Route>
          <Route path="/teams">
            <Teams />
          </Route>

          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/filemanager">
            <FileManager />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/messenger">
            <Messenger />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

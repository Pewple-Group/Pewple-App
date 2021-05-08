import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import db, { auth } from "../firebase";
import "./SignUp.css";
import defaultImage from "../assets/defaultUser.png";
function SignUp({ setSignUp }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [profile, setProfile] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const signUp = (e) => {
    // stop refresh
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          id: result.user.uid,
          displayName: `${firstname} ${lastname}`,
          email: email,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/pewple-app.appspot.com/o/defaultUser.png?alt=media&token=b888c545-0c3f-44ce-9a00-9cefbd2d02bf",
        });

        result.user
          .sendEmailVerification()
          .then(() => {
            alert("Please verify your account");
            history.push("/login");
          })
          .catch((error) => alert(error.message));

        const newUser = {
          fullname: `${firstname} ${lastname}`,
          email: email,
          id: result.user.uid,
          bio: [],
          profession: "",
          photo:
            "https://firebasestorage.googleapis.com/v0/b/pewple-app.appspot.com/o/defaultUser.png?alt=media&token=b888c545-0c3f-44ce-9a00-9cefbd2d02bf",
        };

        db.collection("users").doc(result.user.uid).set(newUser);
        setSignUp(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <div className="signup-frame">
        <div className="signUp-shadow"></div>
        <div className="signUp-circle four"></div>
        <div className="signUp-circle five"></div>
        <div className="signup-component">
          <p>Sign-up</p>
          <form className="signUp-form">
            <div className="signUp-name">
              <div className="signUp-input">
                <p>First Name</p>
                <input
                  type="text"
                  placeholder="alex"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="signUp-input">
                <p>Last Name</p>
                <input
                  type="text"
                  placeholder="sky"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="signUp-input">
              <p>Username</p>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="signUp-input">
              <p>Email</p>
              <input
                type="text"
                placeholder="example@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signUp-input">
              <p>Password</p>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signUp-button" onClick={signUp}>
              <p>Sign-Up</p>
            </div>
          </form>

          <p className="Already-Statement">
            Already have a Account ?
            <span onClick={(e) => setSignUp(false)}> Login </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

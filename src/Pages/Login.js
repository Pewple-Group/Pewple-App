import React, { useState } from "react";
import "./Login.css";
import GoogleLogo from "../assets/GoogleLogo.png";
import GithubLogo from "../assets/githubLogo.png";
import { Link, useHistory } from "react-router-dom";
import db, { auth, GithubProvider, GoogleProvider } from "../firebase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          history.push("/home");
        } else {
          alert("please verify your account");
        }
      })
      .catch((error) => alert(error.message));
  };
  const logInWithGoogle = () => {
    auth
      .signInWithPopup(GoogleProvider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        db.collection("users").doc(result.user.uid).set(newUser);

        history.push("/home");
      })
      .catch();
  };

  const logInWithGithub = () => {
    auth.signInWithPopup(GithubProvider).then((result) => {
      var user = result.user;
      console.log(user);
    });
  };
  return (
    <div className="login">
      <div className="login-frame">
        <div className="circle one"></div>
        <div className="circle two"></div>
        <div className="circle three"></div>
        <div className="shadow"></div>
        <div className="login-component">
          <p>Log-in</p>
          <form className="Login-form">
            <div className="login-input">
              <p>Email</p>
              <input
                type="text"
                placeholder="example@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input">
              <p>Password</p>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-button" onClick={login}>
              <p>Log-in</p>
            </div>
          </form>

          <div className="login-signInOption">
            <div className="login-google" onClick={logInWithGoogle}>
              <img src={GoogleLogo} alt="" />
            </div>
            <div className="login-github" onClick={logInWithGithub}>
              <img src={GithubLogo} alt="" />
            </div>
          </div>
          <div className="or-statement">
            <p>
              ---------- &nbsp; <span>OR</span> &nbsp;----------
            </p>
          </div>
          <div className="login-create">
            <Link to="/signup" className="login-link">
              <p>Create a Pewple Account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

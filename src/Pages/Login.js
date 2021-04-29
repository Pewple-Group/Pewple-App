import React, { useState } from "react";
import "./Login.css";
import GoogleLogo from "../assets/GoogleLogo.png";
import GithubLogo from "../assets/githubLogo.png";
import { Link, useHistory } from "react-router-dom";
import db, { auth, GithubProvider, GoogleProvider } from "../firebase";
import { useStateValue } from "../StateProvider";
function Login({ setSignUp, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{ user }, dispatch] = useStateValue();
  const login = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          dispatch({
            type: "SET_USER",
            user: result.user,
          });
          const newUser = {
            fullname: result.user.displayName,
            photo: result.user.photoURL,
            email: email,
          };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
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
        setUser(newUser);
        db.collection("users").doc(result.user.uid).set(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
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
          <div className="login-create" onClick={() => setSignUp(true)}>
            <p>Create a Pewple Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

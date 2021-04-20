import React from "react";
import "./Login.css";
import GoogleLogo from "../assets/GoogleLogo.png";
import GithubLogo from "../assets/githubLogo.png";
function Login() {
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
              <input type="text" placeholder="example@example.com" />
            </div>
            <div className="login-input">
              <p>Password</p>
              <input type="password" placeholder="Password" />
            </div>
            <div className="login-button">
              <p>Log-in</p>
            </div>
          </form>

          <div className="login-signInOption">
            <div className="login-google">
              <img src={GoogleLogo} alt="" />
            </div>
            <div className="login-github">
              <img src={GithubLogo} alt="" />
            </div>
          </div>
          <div className="or-statement">
            <p>
              ---------- &nbsp; <span>OR</span> &nbsp;----------
            </p>
          </div>
          <div className="login-create">
            <p>Create a Pewple Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./SignUp.css";
function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [profile, setProfile] = useState("");
  const [disable, setDisable] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
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
            <div className="signUp-button">
              <p>Sign-Up</p>
            </div>
          </form>

          <p className="Already-Statement">
            Already have a Account ? <span> Login </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

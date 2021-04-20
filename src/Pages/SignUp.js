import React from "react";
import "./SignUp.css";
function SignUp() {
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
                <input type="text" placeholder="alex" />
              </div>
              <div className="signUp-input">
                <p>Last Name</p>
                <input type="text" placeholder="khalifa" />
              </div>
            </div>
            <div className="signUp-input">
              <p>Username</p>
              <input type="text" placeholder="Username" />
            </div>

            <div className="signUp-input">
              <p>Email</p>
              <input type="text" placeholder="example@example.com" />
            </div>
            <div className="signUp-input">
              <p>Password</p>
              <input type="password" placeholder="Password" />
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

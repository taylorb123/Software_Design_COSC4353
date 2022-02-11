import React from "react";

const Register = (props) => {
  return (
    <body>
      <div className="centerPosition">
        <h1>Register</h1>
        <form method="post">
          <div className="input_field">
            <input type="text" placeholder="Username" required></input>
          </div>
          <div className="input_field">
            <input type="password" placeholder="Password" required></input>
          </div>
          <input
            type="submit"
            value="Create Account"
            className="loginButton"
          ></input>
        </form>
      </div>
    </body>
  );
};

export default Register;

import React from "react";

const Register = (props) => {

  const regSubmitHandler = event => {
    event.preventDefault();
    console.log(document.getElementById("user-name").value);
    console.log(document.getElementById("passw").value);
  }

  return (
    <div>
      <div className="centerPosition">
        <h1>Register</h1>
        <form method=/*"post"*/ "submit" onSubmit={regSubmitHandler}>
          <div className="input_field">
            <input type="text" placeholder="Username" id="user-name" required></input>
          </div>
          <div className="input_field">
            <input type="password" placeholder="Password" id="passw" required></input>
          </div>
          <button type="submit" value="Create Account" className="loginButton" id="loginButton">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import "./Login.css";
import logo from "../img/group30_logo.png";

const Login = (props) => {

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(document.getElementById("user-name").value);
    console.log(document.getElementById("passw").value);
  }

  return (    
    
    <div className="loginBody">
      <div className="centerPosition">
        <h1>
          <img src={logo} alt="logo" className="logoimg" />
        </h1>
        <form method=/*"post"*/ "submit" onSubmit={authSubmitHandler}>
          <div className="input_field">
            <input type="text" placeholder="Username" required id="user-name"></input>
          </div>
          <div className="input_field">
            <input type="password" placeholder="Password" required id="passw"></input>
          </div>
           <button type="submit" value="login" className="loginButton" id="loginButton">Login</button>
           <div className="Register">
            Not registered? <a href="/Register">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "./Login.css"
import logo from '../img/group30_logo.png'

const Login = (props) => {
    return(
      <body>
          <div className="centerPosition">
              <h1>
              <img src={logo} alt="logo" className='logoimg' />
              </h1>
              <form method="post">
                  <div className="input_field">
                      <input type="text" placeholder="Username"
                      required></input>
                  </div>
                  <div className="input_field">
                      <input type="password" placeholder="Password"
                      required></input>
                  </div>
                  <input type="submit" value="login" className="loginButton"></input>
                  <div className="Register">Not registered?  <a href="#">Create an account</a>
                  </div>
              </form>
          </div>
      </body>
    );
  };
  
  export default Login;
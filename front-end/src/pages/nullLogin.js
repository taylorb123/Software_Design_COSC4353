import React from "react";
import "./Login.css"
import logo from '../img/group30_logo.png'

const Login = (props) => {
  return(
    <div className="Login">
      <div className="Sub-Login">
        <div>
            <div className="logo">
                <div className='img'>
                    <img src={logo} alt="logo" className='logoimg' />
                </div>
            </div>
            <body>
            <div className="form">
                    <input type="text"
                    placeholder='Username'
                    className='username'
                     />
                     <input type="password"
                     placeholder='Password'
                     className='password' />
                     <input type='submit' className='btn' value='Submit' />
                </div>
            </body>
        </div>
    </div>
    </div>
  );
};

export default Login;

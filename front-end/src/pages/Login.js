import React, { useCallback, useReducer, useState, useContext } from "react";
import "./Login.css";
import logo from "../img/group30_logo.png";

import Input from "../components/Form/Input";
import { VALIDATOR_MINLENGTH } from "../components/Form/validators";
import { AuthContext } from "../utility/auth-context";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      username: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch(
      {
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      },
      []
    );
  }, []);

  const switchModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        auth.login(formState.inputs.username.value);
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formState.inputs.username.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        alert("Registered sucessfully")
        setIsLogin(true)
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <>
      <form className="fuel-form" onSubmit={loginSubmitHandler}>
        <h1 className="form-title">{isLogin ? "LOGIN" : "REGISTER"}</h1>
        <h1>
          <img src={logo} alt="logo" className="logoimg" />
        </h1>
        <Input
          id="username"
          element="input"
          type="text"
          label="username"
          defaultValue=""
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter at least 8 characters"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          defaultValue=""
          errorText="Please enter a valid password (at least 8 characters)"
          onInput={inputHandler}
        />
        <button
          className="form-button"
          type="submit"
          disabled={!formState.isValid}
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </button>
        <button
          className="form-button"
          type="button"
          inverse
          onClick={switchModeHandler}
        >
          SWITCH TO {isLogin ? "REGISTER" : "LOGIN"}
        </button>
      </form>
    </>
  );
};

export default Login;

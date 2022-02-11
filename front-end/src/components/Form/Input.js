import React, { useReducer, useEffect } from "react";

import { validate } from "./validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.defaultValue || "",
    isTouched: false,
    isValid:
      false ||
      props.id.substring(0, 7) === "address" ||
      props.id === "ppg" ||
      props.id === "total",
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    if (id === "gallons") {
        props.onInput("total", value, isValid)
    }
    props.onInput(id, value, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const inputField = (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.defaultValue}
      onChange={changeHandler}
      onBlur={blurHandler}
      value={inputState.value}
      disabled={props.disabled}
    />
  );

  return (
    <div
      className={`form ${
        !inputState.isValid && inputState.isTouched && "form--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {inputField}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;

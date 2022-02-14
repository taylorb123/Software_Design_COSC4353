import React, { useReducer, useCallback } from "react";

import Input from "../components/Form/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../components/Form/validators";
import "./AccountDetails.css";

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

const AccountDetails = (props) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      state: {
        value: "AL",
        isValid: true,
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

  const accountDetailsSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="fuel-form" onSubmit={accountDetailsSubmitHandler}>
      <Input
        id="full_name"
        element="input"
        type="text"
        label="Full Name"
        defaultValue=""
        validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(50)]}
        errorText="Please enter a valid name (50 characters max)"
        onInput={inputHandler}
      />
      <Input
        id="address1"
        element="input"
        type="text"
        label="Address1"
        validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(100)]}
        defaultValue=""
        errorText="Please enter a valid address (100 characters max)"
        onInput={inputHandler}
      />
      <Input
        id="address2"
        element="input"
        type="text"
        label="Address2"
        validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(100)]}
        defaultValue=""
        errorText="Please enter a valid address (100 characters max)"
        onInput={inputHandler}
      />
      <Input
        id="city"
        element="input"
        type="text"
        defaultValue=""
        label="City"
        validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(50)]}
        errorText="Please enter a city (100 characters max)"
        onInput={inputHandler}
      />
      <Input
        id="state"
        element="dropdown"
        label="State"
        validators={[]}
        errorText="Please select a state"
        onInput={inputHandler}
      />
      <Input
        id="zip"
        element="input"
        type="number"
        label="Zipcode"
        validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(9)]}
        defaultValue=""
        errorText="Please enter a zipcode (between 5 and 9 numbers)"
        onInput={inputHandler}
      />
  <button type="submit" disabled={!formState.isValid}>
      Update Account
    </button>
    </form>
  );
};

export default AccountDetails;

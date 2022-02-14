import React, { useCallback, useReducer } from "react";

import Input from "./Input";
import "./NewFuelQuote.css";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "./validators";

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

const NewFuelQuote = (props) => {
  const PPG = 4;

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      total: {
        value: 0,
        isValid: true,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    if (id === "total") {
      dispatch(
        {
          type: "INPUT_CHANGE",
          value: value * PPG,
          isValid: true,
          inputId: id,
        },
        []
      );
    } else {
      dispatch(
        {
          type: "INPUT_CHANGE",
          value: value,
          isValid: isValid,
          inputId: id,
        },
        []
      );
    }
  }, []);

  const fuelQuoteSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="fuel-form" onSubmit={fuelQuoteSubmitHandler}>
      <h1 className="form-title">Fuel Quote Form</h1>
      <Input
        id="gallons"
        element="input"
        type="number"
        label="Gallons Requested"
        defaultValue={0}
        validators={[VALIDATOR_MIN(1)]}
        errorText="Please enter a valid number of at least 1"
        onInput={inputHandler}
      />
      <Input
        id="address1"
        element="input"
        type="text"
        label="Address1"
        validators={[]}
        defaultValue="Address1"
        errorText="Please enter a valid address (at least 10 characters)"
        onInput={inputHandler}
        disabled={true}
      />
      <Input
        id="address2"
        element="input"
        type="text"
        label="Address2"
        validators={[]}
        defaultValue="Address2"
        errorText="Please enter a valid address (at least 10 characters)"
        onInput={inputHandler}
        disabled={true}
      />
      <Input
        id="date"
        element="input"
        type="date"
        defaultValue="mm/dd/yyyy"
        label="Delivery Date"
        validators={[VALIDATOR_MINLENGTH(1)]}
        errorText="Please enter a date"
        onInput={inputHandler}
      />
      <Input
        id="ppg"
        element="input"
        type="number"
        label="Price Per Gallon"
        validators={[]}
        defaultValue={PPG}
        errorText="Please enter a price"
        onInput={inputHandler}
        disabled={true}
      />
      <Input
        id="total"
        element="input"
        type="number"
        label="Total Amount Due"
        validators={[]}
        defaultValue={formState.inputs.total.value}
        errorText="Please enter a price"
        onInput={inputHandler}
        disabled={true}
      />
      <button className="form-button" type="submit" disabled={!formState.isValid}>
        Submit New Quote
      </button>
    </form>
  );
};

export default NewFuelQuote;

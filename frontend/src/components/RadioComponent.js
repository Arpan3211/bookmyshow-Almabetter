import React from "react";
import "./radioComponent.css";

// Component for radio buttons used in movie and time selection
const RadioComponent = ({ text, changeSelection, data }) => {
  // Function to handle radio button selection
  const handleChecked = (value) => {
    changeSelection(value);
  };

  return (
    <div
      name={text}
      // Apply the 'active' class if the radio button is selected (i.e., data is equal to the text)
      className={`form-check-label ${data === text ? "active" : "inactive"}`}
      onClick={() => {
        // Call the handleChecked function with the selected value
        handleChecked(text);
      }}
    >
      <span className={"text"}>{text}</span>
    </div>
  );
};

export default RadioComponent;

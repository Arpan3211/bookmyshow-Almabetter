import React, { useContext } from "react";
import RadioComponent from "./RadioComponent";
import { slots } from "../../data"; // importing data slots
import "../styles/movieTiming.css";
// The BsContext is imported from ../../context/Context, which is a React Context object that is used to share state between components.
import BsContext from "../../context/Context";


//Inside the TimeShedule component, the useContext hook is used to extract time and changeTime from the BsContext. 
const TimeShedule = () => {
  const context = useContext(BsContext);

  const { time, changeTime } = context;


  // The handleChangeTime function is defined to update the time value in the context and also store it in the local storage
  const handleChangeTime = (value) => {
    // function to update the selected time and storeing  in the local storage
    changeTime(value);
    window.localStorage.setItem("slot", value);
  };

  return (
    <>
      <div className="Slot_container">
        <h1 className="TS_heading">Select a Schedule :-</h1>
        <div className="TS_main_container">
          {slots.map((el, index) => {
            // rendering the radio component on each time slot
            return (
              <RadioComponent
                text={el}
                changeSelection={handleChangeTime}
                data={time}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimeShedule;

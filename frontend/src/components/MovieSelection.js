import React, { useContext } from "react";
import RadioComponent from "./RadioComponent";
import { moviesList } from "../data";
import BsContext from "../context/Context";
import "./movieSelection.css";

const SelectMovie = () => {
  const context = useContext(BsContext);

  const { movie, changeMovie } = context;

  // Handle change in the selected movie
  const handleChangeMovie = (value) => {
    // Update the selected movie in the context
    changeMovie(value);

    // Store the selected movie in local storage
    window.localStorage.setItem("movie", value);
  };

  return (
    <>
      {/* Display the heading */}
      <h1 className="SM_heading">Select a Movie :-</h1>

      {/* Display the movie selection options */}
      <div className="SM_main_container">
        {moviesList.map((el, index) => {
          return (
            <RadioComponent
              text={el}
              changeSelection={handleChangeMovie}
              data={movie}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default SelectMovie;

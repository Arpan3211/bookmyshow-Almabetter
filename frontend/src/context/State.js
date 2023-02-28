import React, { useState, useEffect } from "react";
import BsContext from "./Context";
 


const BsState = (props) => {
  // State variables for managing the application state
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [time, changeTime] = useState("");
  const [movie, changeMovie] = useState("");
  const [noOfSeat, changeNoOfSeats] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });
  const [lastBookingDetails, setLastBookingDetails] = useState(null);

  

  // Function to make a post request to the server with the booking details
  const handlePostBooking = async () => {
    // Sending api request to backend with user selected movie, slot and seats to book movie.
    const response = await fetch(`https://ruby-rhinoceros-cap.cyclic.app/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: movie, slot: time, seats: noOfSeat }),
    });

    const data = await response.json();

    // Show error popup if the response status is not 200
    setErrorPopup(true);
    setErrorMessage(data.message);

    // Clear the form and the local storage if the response status is 200
    if (response.status === 200) {
      changeTime("");
      changeMovie("");
      changeNoOfSeats({
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        D1: "",
        D2: "",
      });
      setLastBookingDetails(data.data);

      window.localStorage.clear();
    }
  };

  // Function to make a get request to the server to get the last booking details
  const handleGetLastBooking = async () => {
    const response = await fetch(`https://ruby-rhinoceros-cap.cyclic.app/api/booking`, {
      method: "GET",
    });

    const data = await response.json();
    // Setting last booking details recieved from the backend.
    setLastBookingDetails(data.data);
  };

  //getting movies, slot and seats from localstorage and updating state (useful when page refreshes)
  useEffect(() => {
    const movie = window.localStorage.getItem("movie");
    const slot = window.localStorage.getItem("slot");
    const seats = JSON.parse(window.localStorage.getItem("seats"));

    if (movie || slot || seats) {
      changeTime(slot);
      changeMovie(movie);
      changeNoOfSeats(seats);
    }
    handleGetLastBooking();
  }, []);

  return (
    // providing all the required data to app
    <BsContext.Provider
      value={{
        handlePostBooking,
        handleGetLastBooking,
        movie,
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        changeNoOfSeats,
        lastBookingDetails,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </BsContext.Provider>
  );
};

export default BsState;

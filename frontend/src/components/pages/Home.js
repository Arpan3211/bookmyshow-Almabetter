/*The Home component in this code imports several other components and uses the useContext hook to retrieve data from the Context . It also defines several helper functions for validation and booking handling. Finally, it renders the UI elements imported below and returns the component. When the user clicks the "Book Now" button, the handleBookNow function is called, which performs validation checks and either displays an error message or handles the booking process. */


// importing the  UI components from the  UI folder 
import LastBookingDetails from "../UI/LastBookingDetails";
import SelectMovie from "../UI/MovieSelection";
import SelectSeats from "../UI/SelectSeats";
import TimeShedule from "../UI/MovieTiming";
import Modal from "../UI/ErrorModal";
// importing the home.css 
import "../styles/Home.css";
//importing context 
import BsContext from "../../context/Context";
import { useContext } from "react";

const Home = (props) => {
  // Get the required data from context using useContext hook
  const context = useContext(BsContext);
  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
    changeNoOfSeats,
  } = context;  // get properties from context

  // function to check if any seat count is negative
  const checkNegativeSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) < 0) {
        return true;
      }
    }

    return false;
  };
 /* The component contains several helper functions, including checkNegativeSeatsValidity and checkZeroSeatsValidity, which check if the number of seats entered by the user is valid. If any seat count is negative or all seat counts are zero, an error message is displayed using the setErrorPopup and setErrorMessage functions from the context. */

  // function to check if all seat counts are zero   
  const checkZeroSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) > 0) {
        return false;
      }
    }
    return true;
  };

  // function to handle the booking process
  const handleBookNow = () => {
    // check if a movie is selected
    if (!movie) {
      setErrorPopup(true);
      setErrorMessage("Please select a movie!");
    }
    // check if a time slot is selected
    else if (!time) {
      setErrorPopup(true);
      setErrorMessage("Please select a time slot!");
    }
    // check if any seat count is negative or all seat counts are zero
    else if (
      checkNegativeSeatsValidity(noOfSeat) ||
      checkZeroSeatsValidity(noOfSeat)
    ) {
      setErrorPopup(true);
      setErrorMessage("Invalid Seats!");
    }
    // all validations passed, proceed with booking
    else {
      handlePostBooking();
      changeNoOfSeats({}); // reset seats after booking
    }
  };



/*  The component also renders the Modal component, which displays error messages, and the SelectMovie, LastBookingDetails, TimeShedule, and SelectSeats components, which are used to select a movie, display the user's last booking details, select a time slot, and select the number of seats, respectively. */


  return (
    <>
      <Modal />
      <div className="container">
        <div className="selection_container">
          <div className="wrapper">
            <div className="select_movie_component">
              <SelectMovie />
            </div>
            <div className="last_booking_details_container">
              <LastBookingDetails />
            </div>
          </div>
          <div className="time_seats_container">
            <TimeShedule />
            <SelectSeats />
            <button
              onClick={() => {
                handleBookNow();
              }}
              className="BN-btn "
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

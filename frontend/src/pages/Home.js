import LastBookingDetails from "../components/LastBookingDetails";
import SelectMovie from "../components/MovieSelection";
import SelectSeats from "../components/SelectSeats";
import TimeShedule from "../components/MovieTiming";
import Modal from "../components/ErrorModal";
import "./Home.css";
import BsContext from "../context/Context";
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
  } = context;

  // function to check if any seat count is negative
  const checkNegativeSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) < 0) {
        return true;
      }
    }

    return false;
  };

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

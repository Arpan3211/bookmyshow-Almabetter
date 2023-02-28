import React, { useEffect } from "react";
import "./lastbookingdetails.css";
import { useContext } from "react";
import BsContext from "../context/Context";
import { seats } from "../data";

const LastBookingDetails = (props) => {
  const context = useContext(BsContext);

  const { handleGetLastBooking, lastBookingDetails } = context;

  useEffect(() => {
    // Fetch last booking details
    handleGetLastBooking();
  }, [handleGetLastBooking]);

  return (
    <div className="last_booking_details_container_main">
      <h2 className="last_booking_details_header">Last Booking Details:</h2>
      {lastBookingDetails ? (
        // If last booking details are available, show them
        <>
          <div className="seats_container">
            <p className="seats_header">Seats:</p>
            <ul className="seats">
              {seats.map((seat, index) => {
                // Map through seats array and show seat value
                return (
                  <li className="seat_value" key={index}>
                    {seat}: {Number(lastBookingDetails.seats[seat])}
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="slot" style={{ textAlign: "left" }}>
            {/* Show time slot for last booking */}
            Slot: <span>{lastBookingDetails.slot}</span>
          </p>
          <p className="movie">
            {/* Show movie name for last booking */}
            Movie: <span>{lastBookingDetails.movie}</span>
          </p>
        </>
      ) : (
        // If lastBookingDetails doesn't exist, display a message
        <p className="no_previous_booking_msg">No Previous Booking Found!</p>
      )}
    </div>
  );
};

export default LastBookingDetails;

import React, { useContext } from "react";
import BsContext from "../context/Context";
import "./errorModal.css";

function Modal(props) {
  // Get the error state and functions from the context
  const context = useContext(BsContext);
  const { errorPopup, errorMessage, setErrorPopup, setErrorMessage } = context;

  // Function to close the error modal
  const handleClosePopup = () => {
    setErrorMessage("");
    setErrorPopup(false);
  };
  // Render the error modal
  return (
    <>
      {errorPopup && (
        <div
          className={`modal-container ${errorPopup ? "active" : "inactive"}`}
        >
          <div className="modal">
            <div className="modal-header">
              <strong>Message</strong>
            </div>
            <div className="modal-body">
              {/* Display the error message */}
              <span>{errorMessage}</span>
            </div>
            <div className="modal-footer">
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

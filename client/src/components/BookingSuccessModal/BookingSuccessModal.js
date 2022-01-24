import React, { useState } from "react";
import complete from "../../assets/icons/complete.png";

import "./BookingSuccessModal.scss";

const BookingSuccessModal = (props) => {
  console.log(props);
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal__container">
        <button className="closeButton" onClick={props.onCloseHandler}></button>
        <div className="modal-header">
          {/* <h4 className="modal__title">.</h4> */}
        </div>
        {/* <div className={props.checkedIn ? "modal__content show" : "hide"}> */}
        <img src={complete} alt="proceed success" className="modal__image" />
        <h2 className="modal__title">Visitor Parking Reserved</h2>
        <ul className="modal__text">
          <li>Please remind your visitors to follow all Covid-19 measures. </li>
          <li>
            Visitors are asked to scan QR code upon arrival and departure.
          </li>
          <li>Maximum parking stay: 24 hours. </li>
        </ul>
        {/* </div> */}
        {/* <div className={props.checkedIn ? "hide" : "modal__content show"}>
          <img src={complete} alt="proceed success" className="modal__image" />
          <h2 className="modal__title">You've checked out.</h2>
          <p className="modal__text">
            Please remember to wait for the gate to close. Have a nice day!
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default BookingSuccessModal;

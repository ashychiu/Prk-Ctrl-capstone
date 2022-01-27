import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import "./AllBookings.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllBookings = () => {
  const [bookingList, setBookingList] = useState([]);
  const [showBookings, setShowBookings] = useState(10);

  const fetchAllBookings = () => {
    axios
      .get(`${API_URL}/bookings`)
      .then((response) => {
        setBookingList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onDeleteHandler = (e) => {
    const bookingId = e.target.id;
    axios
      .delete(`${API_URL}/bookings/${bookingId}`)
      .then((response) => {
        console.log("booking deleted manually");
        fetchAllBookings();
      })
      .catch((err) => console.log("error!", err));
  };

  const sortedList = bookingList.sort(
    (a, b) => Date.parse(b.submitDate) - Date.parse(a.submitDate)
  );

  return (
    <section className="all-bookings">
      <h1 className="all-bookings__title">All Bookings</h1>
      <div className="all-bookings__information desktop">
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Submit Date</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Licence Plate</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Visit Date</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Unit Number</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Remarks</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Checkin</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Checkout</h4>
        </div>
        <div className="all-bookings__actions">
          <h4 className="all-bookings__heading hidden">Action Function</h4>
        </div>
      </div>
      {sortedList.slice(0, showBookings).map((user, i) => {
        return (
          <div key={sortedList[i].id} className="all-bookings__information">
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Submit Date</h4>
              <p>{sortedList[i].submitDate.substr(0, 10)}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Licence Plate</h4>
              <p>{sortedList[i].carPlate}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Visit Date</h4>
              <p>{sortedList[i].requestDate}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Unit Number</h4>
              <p>{sortedList[i].unitNumber}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Remarks</h4>
              <p>{sortedList[i].remarks ? sortedList[i].remarks : "-"}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Checkin Time</h4>
              <p>
                {sortedList[i].checkin ? (
                  <Moment parse="YYYY-MM-DD HH:mm">
                    {sortedList[i].checkin}
                  </Moment>
                ) : (
                  "-"
                )}
              </p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Checkout Time</h4>
              <p>
                {sortedList[i].checkout ? (
                  <Moment parse="YYYY-MM-DD HH:mm">
                    {sortedList[i].checkout}
                  </Moment>
                ) : (
                  "-"
                )}
              </p>
            </div>
            <div className="all-bookings__actions">
              <button
                className="editButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
                value={sortedList[i].requestDate}
                // onClick={onEditHandler}
              ></button>
              <button
                className="deleteButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
                onClick={onDeleteHandler}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={
          sortedList.length > showBookings
            ? "show btn primary-btn"
            : "hide" || sortedList.length === showBookings
            ? "hide"
            : null
        }
      >
        Load More
      </button>
    </section>
  );
};

export default AllBookings;

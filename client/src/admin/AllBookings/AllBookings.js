import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "./AllBookings.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllBookings = () => {
  const [bookingList, setBookingList] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  }, [bookingList]);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onTrashHandler = (e) => {
    setShowModal(true);
    console.log(showModal);
  };

  const sortedList = bookingList.sort((a, b) => b.submitDate - a.submitDate);
  console.log(sortedList);

  return (
    <section className="all-bookings">
      <h1>All Bookings</h1>
      <div className="all-bookings__information">
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
              <p>{sortedList[i].submitDate}</p>
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
              <p>{sortedList[i].remarks ? sortedList[i].remarks : "N/A"}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Checkin Time</h4>
              <p>{sortedList[i].checkin ? sortedList[i].remarks : "N/A"}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Checkout Time</h4>
              <p>{sortedList[i].checkout ? sortedList[i].remarks : "N/A"}</p>
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
                // onClick={onCrossHandler}
              ></button>
            </div>
          </div>
        );
      })}
      <button onClick={handleClick} className="btn loadmore-btn">
        Load More
      </button>
    </section>
  );
};

export default AllBookings;

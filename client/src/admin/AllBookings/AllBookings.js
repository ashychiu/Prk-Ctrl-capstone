import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import "./AllBookings.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllBookings = (props) => {
  const [bookingList, setBookingList] = useState(props.bookingList);
  const [showBookings, setShowBookings] = useState(10);
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [sortType, setSortType] = useState("submitDate");
  const [sortedList, setSortedList] = useState([]);

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

  useEffect(() => {
    const filterBookingList = (query) => {
      const searchTerm = query.toLowerCase();
      const filtered = [...bookingList].filter((booking) => {
        if (!query) {
          return null;
        } else if (
          booking.carPlate.toLowerCase().includes(searchTerm) ||
          booking.unitNumber == searchTerm
        ) {
          return booking;
        }
      });
      setFilteredList(filtered);
    };
    filterBookingList(query);
  }, [query]);

  useEffect(() => {
    const sortBookingList = (sortType) => {
      if (sortType === "visitDate") {
        const sorted = [...bookingList].sort(
          (a, b) => Date.parse(b.requestDate) - Date.parse(a.requestDate)
        );
        setSortedList(sorted);
      }
      if (sortType === "submitDate") {
        const sorted = [...bookingList].sort(
          (a, b) => Date.parse(b.submitDate) - Date.parse(a.submitDate)
        );
        setSortedList(sorted);
      }
    };
    sortBookingList(sortType);
  }, [sortType]);

  // const sortedList = bookingList.sort(
  //   (a, b) => Date.parse(b.submitDate) - Date.parse(a.submitDate)
  // );

  const listToRender = query ? filteredList : sortedList;

  return (
    <section className="all-bookings">
      <h1 className="all-bookings__title">All Bookings</h1>
      <div className="all-bookings__searchbar">
        <div>
          <h4>Search</h4>
          <input
            className="input"
            placeholder="License Plate / Unit Number"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <h4>Sort by</h4>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="none" selected="selected" disabled hidden>
              Sort by
            </option>
            <option value="submitDate">Submit Date</option>
            <option value="visitDate">Visit Date</option>
          </select>
        </div>
      </div>
      <div className="all-bookings__information desktop-bar">
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
          <h4 className="all-bookings__heading">Checkin</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Checkout</h4>
        </div>
        <div className="all-bookings__container">
          <h4 className="all-bookings__heading">Remarks</h4>
        </div>
        <div className="all-bookings__actions">
          <h4 className="all-bookings__heading hidden">Action Function</h4>
        </div>
      </div>
      {listToRender.slice(0, showBookings).map((user, i) => {
        return (
          <div key={listToRender[i].id} className="all-bookings__information">
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Submit Date</h4>
              <p>{listToRender[i].submitDate.substr(0, 10)}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Licence Plate</h4>
              <p>{listToRender[i].carPlate}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Visit Date</h4>
              <p>{listToRender[i].requestDate}</p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Unit Number</h4>
              <p>{listToRender[i].unitNumber}</p>
            </div>

            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Checkin Time</h4>
              <p>
                {listToRender[i].checkin ? (
                  <Moment parse="YYYY-MM-DD HH:mm">
                    {listToRender[i].checkin}
                  </Moment>
                ) : (
                  "-"
                )}
              </p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Checkout Time</h4>
              <p>
                {listToRender[i].checkout ? (
                  <Moment parse="YYYY-MM-DD HH:mm">
                    {listToRender[i].checkout}
                  </Moment>
                ) : (
                  "-"
                )}
              </p>
            </div>
            <div className="all-bookings__container">
              <h4 className="all-bookings__subheader">Remarks</h4>
              <p>{listToRender[i].remarks ? listToRender[i].remarks : "-"}</p>
            </div>
            <div className="all-bookings__actions">
              <button
                className="editButton"
                name={listToRender[i].carPlate}
                id={listToRender[i].id}
                value={listToRender[i].requestDate}
                // onClick={onEditHandler}
              ></button>
              <button
                className="deleteButton"
                name={listToRender[i].carPlate}
                id={listToRender[i].id}
                onClick={onDeleteHandler}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={
          listToRender.length > showBookings
            ? "show btn primary-btn"
            : "hide" || listToRender.length === showBookings
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

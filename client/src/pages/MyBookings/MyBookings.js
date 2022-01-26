import { React, useEffect, useState } from "react";
import axios from "axios";
import BookingModal from "../../components/BookingModal/BookingModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./MyBookings.scss";
import Moment from "react-moment";

const API_URL = process.env.REACT_APP_API_URL;

const MyBookings = (props) => {
  const [myBookings, setMyBookings] = useState([]);
  const [showRebookModal, setShowRebookModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookings, setShowBookings] = useState(5);
  const [carPlate, setCarPlate] = useState("");
  const [unitNumber, setUnitNumber] = useState(props.unitNumber);
  const [bookingId, setBookingId] = useState("");
  const [requestDate, setRequestDate] = useState("");

  useEffect(() => {
    fetchMyBookings();
  }, [JSON.stringify(myBookings)]);

  const fetchMyBookings = () => {
    const userId = props.userId;
    axios
      .get(`${API_URL}/bookings`)
      .then((response) => {
        const bookings = response.data.filter(
          (booking) => booking.userID === userId
        );
        setMyBookings(bookings);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onCloseHandler = () => {
    setShowRebookModal(false);
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const onRebookHandler = (e) => {
    setShowRebookModal(true);
    setCarPlate(e.target.name);
  };

  const onCrossHandler = (e) => {
    setShowDeleteModal(true);
    setBookingId(e.target.id);
  };

  const onEditHandler = (e) => {
    setShowEditModal(true);
    setCarPlate(e.target.name);
    setRequestDate(e.target.value);
    setBookingId(e.target.id);
  };

  const onDeleteHandler = (bookingId) => {
    axios
      .delete(`${API_URL}/bookings/${bookingId}`)
      .then((response) => {
        console.log("Booking deleted");
        fetchMyBookings();
        setShowDeleteModal(false);
      })
      .catch((err) => console.log("error!", err));
  };

  const sortedList = myBookings.sort(
    (a, b) => Date.parse(b.submitDate) - Date.parse(a.submitDate)
  );

  return (
    <section className="mybookings">
      <h1 className="mybookings__title">My Bookings</h1>
      <div className={sortedList.length > 0 ? "hide" : "show"}>
        You have not created any bookings yet.
      </div>
      {sortedList.slice(0, showBookings).map((booking, i) => {
        return (
          <div key={sortedList[i].id} className="mybookings__information">
            <div className="mybookings__container">
              <h4 className="mybookings__subheader">Licence Plate</h4>
              <p>{sortedList[i].carPlate}</p>
            </div>
            <div className="mybookings__container">
              <h4 className="mybookings__subheader">Date of Visit</h4>
              <p>{sortedList[i].requestDate}</p>
            </div>
            <div className="mybookings__container">
              <h4 className="mybookings__subheader">Accessibility</h4>
              <p>{sortedList[i].accessibility}</p>
            </div>
            <div className="mybookings__container">
              <h4 className="mybookings__subheader">Checkin Time</h4>
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
            <div className="mybookings__container">
              <h4 className="mybookings__subheader">Checkout Time</h4>
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
            <div className="mybookings__actions">
              <button
                className={
                  Date.parse(sortedList[i].requestDate) <= Date.now()
                    ? "repeatButton"
                    : "hide"
                }
                name={sortedList[i].carPlate}
                id={sortedList[i].unitNumber}
                onClick={onRebookHandler}
              ></button>
              {/* Edit function not available for past bookings */}
              <button
                className={
                  Date.parse(sortedList[i].requestDate) >= Date.now()
                    ? "editButton"
                    : "hide"
                }
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
                value={sortedList[i].requestDate}
                onClick={onEditHandler}
              ></button>
              <button
                className="deleteButton"
                name={sortedList[i].carPlate}
                id={sortedList[i].id}
                onClick={onCrossHandler}
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

      <BookingModal
        show={showRebookModal || showEditModal}
        onCloseHandler={onCloseHandler}
        bookingId={bookingId}
        carPlate={carPlate}
        unitNumber={unitNumber}
        requestDate={requestDate}
        fetchMyBookings={fetchMyBookings}
      />
      <DeleteModal
        show={showDeleteModal}
        onCloseHandler={onCloseHandler}
        onDeleteHandler={onDeleteHandler}
        bookingId={bookingId}
      />
    </section>
  );
};

export default MyBookings;

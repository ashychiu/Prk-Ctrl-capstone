import { React, useEffect, useState } from "react";
import axios from "axios";
import BookingModal from "../../components/BookingModal/BookingModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./MyBookings.scss";

const API_URL = process.env.REACT_APP_API_URL;

const MyBookings = (props) => {
  const [myBookings, setMyBookings] = useState([]);
  const [showRebookModal, setShowRebookModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookings, setShowBookings] = useState(5);
  const [carPlate, setCarPlate] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [requestDate, setRequestDate] = useState("");

  useEffect(() => {
    fetchMyBookings();
    return () => {
      setMyBookings([]); //unmount
    };
  }, []);

  const fetchMyBookings = () => {
    const userId = props.userId;
    axios
      .get(`${API_URL}/bookings`)
      .then((response) => {
        const bookings = response.data.filter(
          (booking) => booking.userID === userId
        );
        // console.log("before: ", bookings);

        // const sortedBookings = bookings.sort((booking, x, y) => {
        //   return (
        //     y.Date.parse(booking.requestDate) -
        //     x.Date.parse(booking.requestDate)
        //   );
        // });

        // console.log("after: ", sortedBookings);
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
    setUnitNumber(e.target.id);
  };

  const onCrossHandler = (e) => {
    setShowDeleteModal(true);
    setBookingId(e.target.id);
  };

  const onEditHandler = (e) => {
    setShowEditModal(true);
    setCarPlate(e.target.name);
    setUnitNumber(e.target.id);
    setRequestDate(e.target.value);
  };

  const onDeleteHandler = (bookingId) => {
    console.log(bookingId);
    axios
      .delete(`${API_URL}/bookings/${bookingId}`)
      .then((response) => {
        setShowDeleteModal(false);
        fetchMyBookings();
      })
      .catch((err) => console.log("error!", err));
  };

  return (
    <section className="users">
      <h1>My Bookings</h1>
      <div className={myBookings.length <= 0 ? "show" : "hide"}>
        You have not created any bookings yet.
      </div>
      {myBookings.map((booking) => {
        return (
          <div key={booking.id} className="users__information">
            <div className="users__information-data">
              <div className="users__information-top">
                <div className="users__information-location">
                  <h4 className="users__subheader">Licence Plate</h4>
                  <p>{booking.carPlate}</p>
                </div>
                <div className="user-address">
                  <h4 className="users__subheader">Date of Visit</h4>
                  <p className="users__address-details">
                    {booking.requestDate}
                  </p>
                </div>
              </div>
              {/* <div className="user-bottom"> */}
              <div className="user-contact">
                <h4 className="users__subheader">Checkin Time</h4>
                <p className="users__contact-name">{booking.checkin}</p>
              </div>
              <div className="user-contact-information">
                <h4 className="users__subheader">Checkout Time</h4>
                <p className="users__contact-email">{booking.checkout}</p>
              </div>
              {/* </div> */}
            </div>
            <div className="users__actions">
              {/* Repeat function not available for future bookings */}
              <button
                className={
                  Date.parse(booking.requestDate) <= Date.now() ||
                  booking.checkin
                    ? "repeatButton"
                    : "hide"
                }
                name={booking.carPlate}
                id={booking.unitNumber}
                onClick={onRebookHandler}
              ></button>
              {/* Edit function not available for past bookings */}
              <button
                className={
                  Date.parse(booking.requestDate) >= Date.now()
                    ? "editButton"
                    : "hide"
                }
                name={booking.carPlate}
                id={booking.id}
                value={booking.requestDate}
                onClick={onEditHandler}
              ></button>
              <button
                className="deleteButton"
                name={booking.carPlate}
                id={booking.id}
                onClick={onCrossHandler}
              ></button>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={myBookings.length > showBookings ? "show" : "hide"}
      >
        Load More
      </button>

      <BookingModal
        show={showRebookModal || showEditModal}
        onCloseHandler={onCloseHandler}
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

import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "./WhoIsHere.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllUsers = () => {
  const [whoishere, setWhoIsHere] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBookings, setShowBookings] = useState(10);

  //Get all the vistors who have checked in but not checked out
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/bookings`);
      const currentVisitors = data.filter(
        (booking) => booking.checkin !== "" && booking.checkout === ""
      );
      console.log("currvisitor ", currentVisitors);
      setWhoIsHere(currentVisitors);
      console.log("whoishere ", whoishere);
    })();
  }, []);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onTrashHandler = (e) => {
    setShowModal(true);
    console.log(showModal);
  };

  return (
    <section className="users">
      <h1>Who is here</h1>
      {/* blogs.slice(0, visibleBlogs).map((blog, i) */}
      {whoishere.map((booking) => {
        return (
          //   <div className={checkin && !checkout ? "show" : "hide"}>
          <div key={booking.id} className="users__information">
            <div className="users__information-data">
              <div className="users__information-top">
                <div className="users__information-location">
                  <h4 className="users__subheader">Name</h4>
                  <Link
                    to={`booking/${booking.id}`}
                    className="users__location"
                  >
                    <p>{booking.carPlate}</p>
                  </Link>
                </div>
                <div className="user-address">
                  <h4 className="users__subheader">Unit Number</h4>
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
              <button onClick={onTrashHandler}>Manual Check-out</button>
              {/* <img
                name={userList[i].firstName}
                id={user.id}
                // onClick={onTrashHandler}
                className="users__actions-trash"
                src={}
                alt="trashcan"
              /> */}
              <Link to={`bookins/edit/${booking.id}`}>
                <FaUserEdit color="white" />
              </Link>
            </div>
          </div>
          //   </div>
        );
      })}
      <button onClick={handleClick}>Load More</button>;
    </section>
  );
};

export default AllUsers;

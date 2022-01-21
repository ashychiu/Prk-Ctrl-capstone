import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
// import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./WhoIsHere.scss";

const API_URL = process.env.REACT_APP_API_URL;

const AllUsers = () => {
  const [whoIsHere, setWhoIsHere] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBookings, setShowBookings] = useState(5);
  const history = useHistory();

  //Get all the vistors who have checked in but not checked out
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/bookings`);
      const currentVisitors = data.filter(
        (booking) => booking.checkin !== "" && booking.checkout === ""
      );
      setWhoIsHere(currentVisitors);
      console.log(whoIsHere);
    })();
  }, []);

  const handleClick = () => {
    setShowBookings((prevShowBookings) => prevShowBookings + 10);
  };

  const onCheckoutHandler = (e) => {
    setShowModal(true);
    axios
      .patch(`${API_URL}/bookings/checkout`, {
        id: e.target.id,
        carPlate: e.target.name,
      })
      .then((response) => {
        history.push("/admin/whoishere");
        console.log("manual check out completed!");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  return (
    <section className="users">
      <h1>Who is here</h1>
      <div className={whoIsHere.length > 0 ? "hide" : "show"}>
        No one is here
      </div>
      {/* blogs.slice(0, visibleBlogs).map((blog, i) */}
      {whoIsHere.map((booking) => {
        return (
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
              <button
                name={booking.carPlate}
                id={booking.id}
                onClick={onCheckoutHandler}
              >
                Manual Check-out
              </button>
              <Link to={`bookins/edit/${booking.id}`}>
                <FaUserEdit color="white" />
              </Link>
            </div>
          </div>
        );
      })}
      <button
        onClick={handleClick}
        className={whoIsHere.length > showBookings ? "show" : "hide"}
      >
        Load More
      </button>

      <DeleteModal
        show={showModal}
        // onCloseHandler={onCloseHandler}
        // onTrashHandler={onTrashHandler}
        // onDeleteHandler={onDeleteHandler}
        //   itemId={this.state.warehouseId}
        //   name="Warehouse"
        //   itemName={this.state.warehouseName}
      />
    </section>
  );
};

export default AllUsers;

// import IoCloseCircleSharp from "react-icons/io5";
import "./ContactModal.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const ContactModal = (props) => {
  const [contactPerson, setContactPerson] = useState([]);
  console.log(props);

  const { userID, userList } = props;
  const fetchUser = () => {
    const foundUser = userList.find((user) => userID === user.id);
    setContactPerson(foundUser);
  };
  // const foundUser = props.userList.find((user) => userID === user.id);

  console.log("Found User:", contactPerson);

  // if (props.userID) {
  // const fetchUserInfo = () => {
  //   axios
  //     .get(`${API_URL}/users/${props.userID}`)
  //     .then((response) => {
  //       console.log(response);
  //       setContactPerson(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // // }

  useEffect(() => {
    fetchUser();
    // return () => {
    //   setContactPerson([]); //unmount
    // };
  }, [userID]);

  console.log("useEffect: ", contactPerson);

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-del">
      <div className="modal-del-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>
        <div className="modal-del-header">
          <h4 className="modal-del__title">
            Licence Plate <span className="emphasis">{props.carPlate}</span>
          </h4>
          {contactPerson ? (
            <div className="modal-del__content">
              <p>
                <strong>Contact Person:</strong> {contactPerson.firstName}{" "}
                {contactPerson.lastName}
              </p>
              <p>
                <strong>Phone Number:</strong> {contactPerson.phone}
              </p>
              <p>
                <strong>Unit Number:</strong> {contactPerson.unitNumber}
              </p>
              <p>
                <strong>Status:</strong> {contactPerson.status}
              </p>
            </div>
          ) : (
            <p>Fetching Data...</p>
          )}
          {/* <div className="modal-del-footer">
            <button
              className="modal-del-footer__cancel"
              onClick={props.onCloseHandler}
            >
              Cancel
            </button>
            <button
              className="modal-del-footer__delete"
              onClick={() => props.onDeleteHandler(props.bookingId)}
            >
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default ContactModal;

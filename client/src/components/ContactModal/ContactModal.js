import "./ContactModal.scss";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const ContactModal = (props) => {
  const [contactPerson, setContactPerson] = useState([]);

  const { userID, userList } = props;
  const fetchUser = () => {
    const foundUser = userList.find((user) => userID === user.id);
    setContactPerson(foundUser);
  };
  useEffect(() => {
    fetchUser();
    // return () => {
    //   setContactPerson([]); //unmount
    // };
  }, [JSON.stringify(userID)]);

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
            <p className="modal-del__content">Fetching Data...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactModal;

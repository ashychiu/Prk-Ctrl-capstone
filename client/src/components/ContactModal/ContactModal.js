import React, { useEffect, useState } from "react";
import "./ContactModal.scss";

const ContactModal = (props) => {
  const [contactPerson, setContactPerson] = useState([]);

  const { userID, userList } = props;
  const fetchUser = () => {
    const foundUser = userList.find((user) => userID === user.id);
    setContactPerson(foundUser);
  };
  useEffect(() => {
    fetchUser();
  }, [JSON.stringify(userID)]);

  if (!props.show) {
    return null;
  }

  return (
    <div className="contact-modal">
      <div className="contact-modal-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>
        <div className="contact-modal-header">
          <h4 className="contact-modal__title">
            Licence Plate <span className="emphasis">{props.carPlate}</span>
          </h4>
          {contactPerson ? (
            <div className="contact-modal__content">
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
            <p className="contact-modal__content">Fetching Data...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactModal;

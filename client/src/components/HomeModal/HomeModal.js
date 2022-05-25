import React from "react";
import { MdContentCopy } from "react-icons/md";
import "./HomeModal.scss";

const HomeModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="home-modal">
      <div className="home-modal-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>
        <div className="home-modal-header">
          <h4 className="home-modal__title">Hi, Welcome to our demo! </h4>
          <div className="home-modal__content">
            <p>
              <strong>
                Resident Login: <span>(this page)</span>
              </strong>
              <p>
                email: prkctrl.app@gmail.com{" "}
                <MdContentCopy onClick={props.handleLogin} className="icon" />
              </p>
              <p>password: ashley</p>
            </p>
            <p>
              <strong>Admin Portal: </strong>
              <a href="http://www.prkctrl.com/admin" target="_blank">
                http://www.prkctrl.com/admin
              </a>
              <p>username: admin</p>
              <p>password: admin</p>
            </p>
            <p>
              <strong>Visitor Check-in: </strong>
              <a href="http://www.prkctrl.com/visitor" target="_blank">
                http://www.prkctrl.com/visitor
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeModal;

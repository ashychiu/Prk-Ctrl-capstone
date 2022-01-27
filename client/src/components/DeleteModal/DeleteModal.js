import React from "react";
import "./DeleteModal.scss";

const deleteModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>
        <div className="delete-modal-header">
          <h4 className="delete-modal__title">Delete?</h4>
          <div className="delete-modal__content">
            Please confirm that you’d like to delete this booking. You won’t be
            able to undo this action.
          </div>
          <div className="delete-modal-footer">
            <button
              className="delete-modal-footer__cancel"
              onClick={props.onCloseHandler}
            >
              Cancel
            </button>
            <button
              className="delete-modal-footer__delete"
              onClick={() => props.onDeleteHandler(props.bookingId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default deleteModal;

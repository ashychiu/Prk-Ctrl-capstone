import "./DeleteModal.scss";

const deleteModal = (props) => {
  console.log(props);
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-del">
      <div className="modal-del-content">
        <button className="closeButton" onClick={props.onCloseHandler}></button>
        <div className="modal-del-header">
          <h4 className="modal-del__title">Delete?</h4>
          <div className="modal-del__content">
            Please confirm that you’d like to delete this booking. You won’t be
            able to undo this action.
          </div>
          <div className="modal-del-footer">
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default deleteModal;

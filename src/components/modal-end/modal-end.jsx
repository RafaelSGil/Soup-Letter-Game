import React from "react";
import "./modal-end.css";

function Modal(props) {
  const { setOpenModal, totalPoints, win } = props;
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{win ? "WIN" : "LOSE"}</h1>
        </div>
        <div className="body">
          <div>
            <h1>POINTS</h1>
            <h1>{totalPoints}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

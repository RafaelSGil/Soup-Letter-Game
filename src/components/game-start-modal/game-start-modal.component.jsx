import React, { useEffect } from "react";
import "../control-panel/control-panel.css";
import "./Modal.css";

const StartGameModal = (props) => {
  if (!props.show) {
    return null;
  }
  //na app podemos ter dois valores da propriedade show
  //true / false
  //se true, mostra modal
  // se false, esconde modal

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  //verificar o esc para fechar o modal
  //   useEffect(() => {
  //     document.body.addEventListener("keydown", closeOnEscapeKeyDown);
  //     return function cleanup() {
  //       document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
  //     };
  //   }, []);

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h1>Start Game</h1>
          </div>
          <div className="modal-body">
            <form className="form">
              <fieldset className="form-group left">
                <label htmlFor="btLevel">Level Selector:</label>
                <select id="btLevel">
                  <option defaultValue value="0">
                    Seleccione...
                  </option>{" "}
                  <option value="1">Básico (2x3)</option>
                  <option value="2">Intermédio (3x4)</option>{" "}
                  <option value="3">Avançado (4x5)</option>
                </select>
              </fieldset>
              <button type="button" id="btPlay" className="right">
                Iniciar Jogo
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartGameModal;

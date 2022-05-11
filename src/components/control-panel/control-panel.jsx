import React from "react";

import "./control-panel.css";

function ControlPanel() {
  return (
    <>
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
    <div id="panel-control">
      
      <h3 className="sr-only">
        Level Selector:
      </h3>
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
      <div>OLA MUITO BEM VINDOS</div>
    </div>
    </>
  );
}

export default ControlPanel;

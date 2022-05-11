import React from "react";
import "../control-panel/control-panel.css";

function StartGameModal() {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">
                        <h1>Start Game</h1>
                    </div>
                </div>
                <div className="modal-body">
                    <fieldset className="form-group left">
                        <label htmlFor="btLevel">Level Selector:</label>
                        <select id="btLevel">
                            <option defaultValue value="0">
                            Choose...
                            </option>{" "}
                            <option value="1">Básico (2x3)</option>
                            <option value="2">Intermédio (3x4)</option>{" "}
                            <option value="3">Avançado (4x5)</option>
                        </select>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}


export default StartGameModal;

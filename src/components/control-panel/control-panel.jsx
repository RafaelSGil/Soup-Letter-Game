import React from "react";
import { useState } from "react";

import "./control-panel.css";

function ControlPanel(props) {
  const {
    difficulty,
    handleDifficulty,
    gameStarted,
    onGameStart,
    totalPoints,
    getWord,
  } = props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";

  return (
    <section id="panel-control">
      <h3 className="sr-only">Choose dificulty level</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Level:</label>
          <select
            id="btLevel"
            defaultValue="0"
            onChange={handleDifficulty}
            disabled={gameStarted}
          >
            <option value="0">Select...</option>
            <option value="1">Easy (10x10)</option>
            <option value="2">Normal (15x15)</option>
            <option value="3">Hard (20x20)</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={difficulty === ""}
          onClick={onGameStart}
        >
          {gameStarted ? "Finish Game" : "Start Game"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Click Start Game
        </p>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Game Time:</dt>
          <dd id="gameTime">{props.timer}</dd>
        </dl>
        <dl className={`list-item right${gameStartedClass}`}>
          <dt>TOP Score:</dt>
          <dd id="pointsTop">0</dd>
        </dl>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Score:</dt>
          <dd id="points">{totalPoints}</dd>
        </dl>
        <div id="newWord" className={`right`}>
          <button id="btTop" onClick={getWord}>
            add Word
          </button>
        </div>
      </div>
    </section>
  );
}

export default ControlPanel;

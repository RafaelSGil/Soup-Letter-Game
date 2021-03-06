import React from "react";
import { useState } from "react";

import GridSquare from "../game-board/grid-square";
import "./game-panel.css";

function GamePanel(props) {
  const { board, handleLettersClicked } = props;
  let gameClass = "easy";
  let gameHide = "hide";

  if (props.difficulty === "Medium") gameClass = "intermedio";
  else if (props.difficulty === "Hard") gameClass = "avancado";

  if (props.gameStarted) {
    gameHide = "";
  }

  return (
    <section className="game-panel">
      <div className="container">
        <div id="game" className={`${gameClass} ${gameHide}`}>
          {board.map((cell, index) => (
            <GridSquare
              key={cell.key}
              cell={cell}
              coordinates={index}
              handleLettersClicked={handleLettersClicked}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GamePanel;

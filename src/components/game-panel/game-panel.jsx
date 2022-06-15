import React from "react";
import { useState } from "react";

import GridSquare from "../game-board/grid-square";
import "./game-panel.css";

function GamePanel(props) {
  const { difficulty, board } = props;
  const [words, setWords] = useState([]);
  let gameClass = "easy";
  let gameHide = "hide";

  const handleSetWords = (word) => {
    setWords(word);
  };

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
              difficulty={difficulty}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GamePanel;

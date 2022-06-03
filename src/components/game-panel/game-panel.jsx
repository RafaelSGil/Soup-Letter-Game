import React from "react";
import { useState } from "react";

import GameBoard from "../game-board/game-board";
import "./game-panel.css";

function GamePanel(props) {
  const [words, setWords] = useState([]);
  let gameClass = "";

  const handleSetWords = (word) => {
    setWords(word);
  };

  if (props.difficulty === "Medium") gameClass = "intermedio";
  else if (props.difficulty === "Hard") gameClass = "avancado";

  return (
    <section className="game-panel">
      <div>
        {props.difficulty !== "" ? (
          <GameBoard difficulty={props.difficulty} setWords={handleSetWords} />
        ) : null}
      </div>
    </section>
  );
}

export default GamePanel;

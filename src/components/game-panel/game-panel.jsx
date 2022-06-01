import React from "react";

import GameBoard from "../game-board/game-board";
import "./game-panel.css";

function GamePanel(props) {
  let gameClass = "";

  if (props.difficulty === "Medium") gameClass = "intermedio";
  else if (props.difficulty === "Hard") gameClass = "avancado";

  return (
    <section className="game-panel">
      <div>
        {props.gameStarted ? <GameBoard difficulty={props.difficulty} /> : null}
      </div>
    </section>
  );
}

export default GamePanel;

import React from "react";
import GridSquare from "./grid-square";
import "./game-board.css";

function GameBoard() {
  const grid = [];

  for (let i = 0; i < 5; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      grid[i].push(<GridSquare key={`${j}${i}`} color="1" />);
    }
  }

  return <div className="grid-board">{grid}</div>;
}

export default GameBoard;

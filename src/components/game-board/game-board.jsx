import React from "react";
import GridSquare from "./grid-square";
import "./game-board.css";
import shuffleArray from "../../helpers/shuffle";
import { ALPHABET } from "../../constants";
import { words } from "../../constants";

function GameBoard(props) {
  const grid = [];
  let letter;
  let difficulty = "";
  let rows = 5;
  let columns = 5;

  if (props.difficulty === "Medium") {
    difficulty = "Medium";
    rows = 10;
    columns = 10;
  } else if (props.difficulty === "Hard") {
    difficulty = "Hard";
    rows = 20;
    columns = 20;
  }

  const randomWords = shuffleArray(words);

  //arranjar maneira de meter as letras da palavra dentro do GridQuare

  const classes = `grid-board grid-${difficulty}`;

  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < columns; j++) {
      letter = shuffleArray(ALPHABET).slice(0, 1);
      letter = grid[i].push(
        <GridSquare
          key={`${j},${i}`}
          letter={letter}
          difficulty={props.difficulty}
          id={`${j},${i}`}
        />
      );
    }
  }

  return <div className={classes}>{grid}</div>;
}

export default GameBoard;

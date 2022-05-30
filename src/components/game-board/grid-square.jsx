import React from "react";

import "./game-square.css";
import shuffleArray from "../../helpers/shuffle";
import { ALPHABET } from "../../constants";

function GridSquare(props) {
  const classes = `grid-square color-${props.color}`;
  const shuffledAlphabet = shuffleArray(ALPHABET);
  const letter = shuffledAlphabet.slice(0, 1);
  return <div className={classes}>{letter}</div>;
}

export default GridSquare;

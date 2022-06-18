import React from "react";
import { useState } from "react";

import "./game-square.css";

function GridSquare(props) {
  const { cell, coordinates, handleLettersClicked } = props;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      draggable="true"
      className={`grid-square grid-square-${props.difficulty}`}
      onClick={(e) => handleLettersClicked(e, cell, coordinates)}
      data={cell}
    >
      {cell}
    </button>
  );
}

export default GridSquare;

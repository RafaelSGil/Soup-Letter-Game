import React from "react";
import { useState } from "react";

import "./game-square.css";

function GridSquare(props) {
  const { cell, coordinates, handleLettersClicked } = props;

  return (
    <button
      className={`grid-square`}
      onClick={(e) => handleLettersClicked(e, cell, coordinates)}
    >
      {cell}
    </button>
  );
}

export default GridSquare;

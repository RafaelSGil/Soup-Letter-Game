import React from "react";
import { useState } from "react";

import "./game-square.css";

function GridSquare(props) {
  const { cell, coordinates, handleLettersClicked } = props;
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked((current) => !current);
  };

  return (
    <button
      draggable="true"
      className={`grid-square grid-square-${props.difficulty}`}
      style={{
        backgroundColor: isClicked ? "#cb70ff" : "",
        color: isClicked ? "white" : "",
      }}
      onClick={(e) => handleLettersClicked(e, cell)}
      data={cell}
    >
      {cell}
    </button>
  );
}

export default GridSquare;

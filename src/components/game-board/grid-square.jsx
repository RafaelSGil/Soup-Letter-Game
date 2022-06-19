import React from "react";
import { useState } from "react";

//não esquecer de alterar o nome para grid square
import "./game-square.css";

function GridSquare(props) {
  const { cell, coordinates, handleLettersClicked } = props;
  const [isClicked, setIsClicked] = useState(false);

  //first coordinate
  //allCordinate
  //if coordinates dentro do all coordinates

  return (
    <button
      className={`grid-square grid-square-${props.difficulty}`}
      onClick={(e) => handleLettersClicked(e, cell, coordinates)}
    >
      {cell}
    </button>
  );
}

export default GridSquare;

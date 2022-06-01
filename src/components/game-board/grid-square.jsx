import React from "react";
import { useState } from "react";

import "./game-square.css";

function GridSquare(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked((current) => !current);
  };

  return (
    <div
      className={`grid-square grid-square-${props.difficulty}`}
      style={{
        backgroundColor: isClicked ? "red" : "",
        color: isClicked ? "white" : "",
      }}
      onClick={handleIsClicked}
    >
      {props.letter}
    </div>
  );
}

export default GridSquare;

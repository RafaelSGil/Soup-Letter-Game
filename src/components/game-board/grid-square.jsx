import React from "react";

import "./game-square.css";

function GridSquare(props) {
  return <div className="grid-square">{props.letter}</div>;
}

export default GridSquare;

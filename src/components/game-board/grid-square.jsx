import React from "react";

import "./game-square.css";

function GridSquare(props) {
  const classes = `grid-square color-${props.color}`;
  return <div className={classes}></div>;
}

export default GridSquare;

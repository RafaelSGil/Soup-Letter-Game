import React from "react";
import ControlPanel from "../control-panel/control-panel";

function Header() {
  const containerColor = {
    backgroundColor: "#f1f0f0",
  };
  return (
    <div>
      <h2 className="title">CrossWord Game</h2>
      <h3>Find all the words to win!</h3>
    </div>
  );
}

export default Header;

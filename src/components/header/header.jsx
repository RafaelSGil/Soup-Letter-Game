import React from "react";
import ControlPanel from "../control-panel/control-panel";

function Header() {
  const containerColor = {
    backgroundColor: "#f1f0f0",
  };
  return (
    <div id="container">
      <h2>WORD GAME</h2>
      <h3>Find all the words and win money!</h3>
      <ControlPanel />
    </div>
  );
}

export default Header;

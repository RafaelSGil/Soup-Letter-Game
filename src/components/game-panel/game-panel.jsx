import React from "react";

import Header from "../header/header";
import Footer from "../footer/footer";
import GameBoard from "../game-board/game-board";

function GamePanel() {
  return (
    <div id="game-panel game">
      <Header />
      <div className="App">
        <GameBoard />
      </div>
      <Footer />
    </div>
  );
}

export default GamePanel;

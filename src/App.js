import React, { useState } from "react";
import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import StartGameModal from "./components/game-start-modal/game-start-modal.component";
import Header from "./components/header/header";
import GridSquare from "./components/game-board/grid-square";

function App() {
  //true por default para abrir logo iniciamos a app
  const [show, setShow] = useState(true);
  //<button onClick={() => setShow(true)}>show</button>
  return (
    <>
      <div>
        <GamePanel />
        <div className="App">
          <StartGameModal onClose={() => setShow(false)} show={show} />
        </div>
      </div>
    </>
  );
}

export default App;

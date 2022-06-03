import React, { useState } from "react";
import { useEffect } from "react";
import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import StartGameModal from "./components/game-start-modal/game-start-modal.component";
import Header from "./components/header/header";
import ControlPanel from "./components/control-panel/control-panel";
import Footer from "./components/footer/footer";

let timerID = undefined;

function App() {
  //true por default para abrir logo iniciamos a app
  const [show, setShow] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(50);

  useEffect(() => {
    //if game started, start timer
    if (gameStarted) {
      timerID = setInterval(() => {
        let nextTimer;
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });
        if (nextTimer === 0) {
          setGameStarted(false);
        }
      }, 1000);
    } else if (timer !== 50) {
      setTimer(50);
    }
    return () => {
      if (timerID == 0) {
        clearInterval(timerID);
      }
    };
  }, [gameStarted]);

  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  };

  const handleDifficulty = (event) => {
    const { value } = event.currentTarget;

    switch (value) {
      case "1":
        setDifficulty("Easy");
        break;
      case "2":
        setDifficulty("Medium");
        break;
      case "3":
        setDifficulty("Hard");
        break;
      default:
        setDifficulty("");
        break;
    }
  };

  //<button onClick={() => setShow(true)}>show</button>

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <ControlPanel
          difficulty={difficulty}
          handleDifficulty={handleDifficulty}
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          timer={timer}
        />
        <GamePanel difficulty={difficulty} gameStarted={gameStarted} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

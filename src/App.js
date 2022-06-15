import React, { useState } from "react";
import { useEffect } from "react";
import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import WordPanel from "./components/word-panel/word-panel";
import StartGameModal from "./components/game-start-modal/game-start-modal.component";
import Header from "./components/header/header";
import ControlPanel from "./components/control-panel/control-panel";
import Footer from "./components/footer/footer";
import buildBoard from "./helpers/buildBoard";
import { words, BOARD_EASY, WORDS_EASY } from "./constants/index";

let timerID = undefined;

function App() {
  //true por default para abrir logo iniciamos a app
  const [show, setShow] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(50);
  const [totalPoints, setTotalPoints] = useState(0);
  const [board, setBoard] = useState([]);
  const [numberWords, setNumberWords] = useState([]);
  const [boardSize, setBoardSize] = useState(0);
  const [wordsInside, setWordsInside] = useState([]);

  useEffect(() => {
    let tempBoard;
    let tempWords;
    [tempBoard, tempWords] = buildBoard(difficulty, words);
    console.log(tempWords);
    setBoard(tempBoard);
    setWordsInside(tempWords);

    if (gameStarted) {
      timerID = setInterval(() => {
        let nextTimer;
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          if (nextTimer === 0) {
            setGameStarted(false);
          }
          return nextTimer;
        });
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
        <WordPanel
          difficulty={difficulty}
          gameStarted={gameStarted}
          words={wordsInside}
        />
        <GamePanel
          difficulty={difficulty}
          gameStarted={gameStarted}
          board={board}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;

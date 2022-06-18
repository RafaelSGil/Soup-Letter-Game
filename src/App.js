import React, { useState } from "react";
import { useEffect } from "react";
import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import WordPanel from "./components/word-panel/word-panel";
import Header from "./components/header/header";
import ControlPanel from "./components/control-panel/control-panel";
import Footer from "./components/footer/footer";
import buildBoard from "./helpers/buildBoard";
import { words, TIMEOUT } from "./constants/index";

let timerId = undefined;

function App() {
  //true por default para abrir logo iniciamos a app
  const [show, setShow] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(50);
  const [totalPoints, setTotalPoints] = useState(0);
  const [board, setBoard] = useState([]);
  const [wordsInside, setWordsInside] = useState([]);
  const [lettersClicked, setLettersClicked] = useState("");
  const [wordsFound, setWordsFound] = useState([]);
  const [coordinatesCell, setCoordinatesCell] = useState([]);

  useEffect(() => {
    //set board and words, whem game starts
    let tempBoard;
    let tempWords;
    [tempBoard, tempWords] = buildBoard(difficulty, words);
    setBoard(tempBoard);
    setWordsInside(tempWords);
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });
        if (nextTimer === 0) {
          setGameStarted(false);
        }
      }, 1000);
    } else {
      if (timer !== TIMEOUT) {
        setTimer(TIMEOUT);
      }
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      if (wordsFound.length === wordsInside.length) {
        setGameStarted(false);
        setWordsFound([]);
        setLettersClicked("");
      } else {
        console.log("not over");
      }
    }
  }, [wordsFound]);

  const handleGameStart = () => {
    if (gameStarted) {
      setWordsFound([]);
      setLettersClicked("");
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

  const handleWordsFound = (word) => {
    let allWordsFound = wordsFound;
    allWordsFound.push(word);
    setWordsFound(allWordsFound);
  };

  const handleLettersClicked = (event, letter) => {
    if (gameStarted) {
      event.stopPropagation();
      const currentLetter = lettersClicked;
      const newLetters = currentLetter + letter;
      setLettersClicked(newLetters);
    }
  };

  const resetLetterClicked = () => {
    setLettersClicked("");
  };

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
          gameStarted={gameStarted}
          words={wordsInside}
          lettersClicked={lettersClicked}
          resetLetterClicked={resetLetterClicked}
          wordsFound={wordsFound}
          onWordFound={handleWordsFound}
        />
        <GamePanel
          difficulty={difficulty}
          gameStarted={gameStarted}
          board={board}
          handleLettersClicked={handleLettersClicked}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;

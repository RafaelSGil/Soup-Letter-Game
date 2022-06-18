import React, { useState } from "react";
import { useEffect } from "react";
import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import WordPanel from "./components/word-panel/word-panel";
import Header from "./components/header/header";
import ControlPanel from "./components/control-panel/control-panel";
import Footer from "./components/footer/footer";
import buildBoard from "./helpers/buildBoard";
import {
  words,
  TIMEOUT,
  BOARD_EASY,
  BOARD_MEDIUM,
  BOARD_HARD,
} from "./constants/index";

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
  const [firstLetterCoordinates, setFirstLetterCoordinates] = useState(-1);
  const [directionWhenClicked, setDirectionWhenClicked] = useState("");
  const [boardSize, setBoardSize] = useState(0);
  const [allCoordinates, setAllCoordinates] = useState([]);

  useEffect(() => {
    //set board and words, when game starts
    let tempBoard;
    let tempWords;
    [tempBoard, tempWords] = buildBoard(difficulty, words);
    setBoard(tempBoard);
    setWordsInside(tempWords);

    console.log("Words inside " + wordsInside.length);
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
          console.log("YOU LOSE!");
          setGameStarted(false);
          resetLetterClicked();
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

  const handleGameStart = () => {
    if (gameStarted) {
      setWordsFound([]);
      resetLetterClicked();
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  };

  const handleGameEnd = () => {
    if (wordsFound.length / 2 === wordsInside.length) {
      console.log("YOU WIN");
      setGameStarted(false);
      setWordsFound([]);
      resetLetterClicked();
    }
  };

  const handleDifficulty = (event) => {
    const { value } = event.currentTarget;

    switch (value) {
      case "1":
        setDifficulty("Easy");
        setBoardSize(BOARD_EASY);
        break;
      case "2":
        setDifficulty("Medium");
        setBoardSize(BOARD_MEDIUM);
        break;
      case "3":
        setDifficulty("Hard");
        setBoardSize(BOARD_HARD);
        break;
      default:
        setDifficulty("");
        setBoardSize(0);
        break;
    }
  };

  const handleTotalPoints = (word) => {
    let multiplier;
    switch (difficulty) {
      default:
        multiplier = 2;
        break;
      case "Medium":
        multiplier = 2.5;
        break;
      case "Hard":
        multiplier = 3;
        break;
    }

    let points = word.length * multiplier * 10 + totalPoints;
    setTotalPoints(points);
  };

  const handleWordsFound = (word) => {
    let allWordsFound = wordsFound;
    allWordsFound.push(word);
    setWordsFound(allWordsFound);
    handleTotalPoints(word);
  };

  const handleFirstLetterCoordinates = (coordinates) => {
    setFirstLetterCoordinates(coordinates);
  };

  const handleAllCoordinates = (coordinates) => {
    let arr = allCoordinates;
    arr.push(coordinates);
    setAllCoordinates(arr);
  };

  const handleLettersClicked = (event, letter, coordinates) => {
    if (gameStarted) {
      const firstCoordinates = firstLetterCoordinates;
      const dir = directionWhenClicked;
      let lastCoordinate = -1;
      if (allCoordinates.length !== 0) {
        lastCoordinate = allCoordinates[allCoordinates.length - 1];
        console.log("Last coordenate " + lastCoordinate);
      }

      //First time clicking or after completing a word
      if (firstCoordinates === -1) {
        handleFirstLetterCoordinates(coordinates);
        const currentLetter = lettersClicked;
        const newLetters = currentLetter + letter;
        setLettersClicked(newLetters);
      }
      //Second time clicking, defines which direction to go
      if (firstCoordinates !== -1 && dir === "") {
        if (coordinates === firstCoordinates - boardSize + 1) {
          setDirectionWhenClicked("diagonalBottomRight");
        }
        if (coordinates === firstCoordinates - boardSize) {
          setDirectionWhenClicked("downTop");
        }
        if (coordinates === firstCoordinates - boardSize - 1) {
          setDirectionWhenClicked("diagonalBottomLeft");
        }
        if (coordinates === firstCoordinates + 1) {
          setDirectionWhenClicked("leftRight");
        }
        if (coordinates === firstCoordinates + boardSize + 1) {
          setDirectionWhenClicked("diagonalTopRight");
        }
        if (coordinates === firstCoordinates + boardSize) {
          setDirectionWhenClicked("topDown");
        }
        if (coordinates === firstCoordinates + boardSize - 1) {
          setDirectionWhenClicked("diagonalTopLeft");
        }
        if (coordinates === firstCoordinates - 1) {
          setDirectionWhenClicked("rightLeft");
        }

        handleAllCoordinates(coordinates);
        const currentLetter = lettersClicked;
        const newLetters = currentLetter + letter;
        setLettersClicked(newLetters);
      }

      if (directionWhenClicked !== "") {
        switch (directionWhenClicked) {
          case "diagonalBottomRight":
            if (coordinates === lastCoordinate - boardSize + 1) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "downTop":
            if (coordinates === lastCoordinate - boardSize) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "diagonalBottomLeft":
            if (coordinates === lastCoordinate - boardSize - 1) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "leftRight":
            if (coordinates === lastCoordinate + 1) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "diagonalTopRight":
            if (coordinates === lastCoordinate + boardSize + 1) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "topDown":
            if (coordinates === lastCoordinate + boardSize) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "diagonalTopLeft":
            if (coordinates === lastCoordinate + boardSize - 1) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
          case "rightLeft":
            if (coordinates === lastCoordinate - 1) {
              handleAllCoordinates(coordinates);
              const currentLetter = lettersClicked;
              const newLetters = currentLetter + letter;
              setLettersClicked(newLetters);
            }
            break;
        }
      }
    }
  };

  useEffect(() => {
    console.log("allCoordinates " + allCoordinates);
  }, [allCoordinates]);

  useEffect(() => {
    console.log("Coordinates " + firstLetterCoordinates);
  }, [firstLetterCoordinates]);

  useEffect(() => {
    console.log("Direction " + directionWhenClicked);
  }, [directionWhenClicked]);

  const resetLetterClicked = () => {
    setLettersClicked("");
    setFirstLetterCoordinates(-1);
    setDirectionWhenClicked("");
    setAllCoordinates([]);
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
          totalPoints={totalPoints}
        />
        <WordPanel
          gameStarted={gameStarted}
          words={wordsInside}
          lettersClicked={lettersClicked}
          resetLetterClicked={resetLetterClicked}
          wordsFound={wordsFound}
          onWordFound={handleWordsFound}
          onGameEnd={handleGameEnd}
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

import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import "./assets/styles/App.css";
import GamePanel from "./components/game-panel/game-panel";
import WordPanel from "./components/word-panel/word-panel";
import Header from "./components/header/header";
import ControlPanel from "./components/control-panel/control-panel";
import Footer from "./components/footer/footer";
import buildBoard from "./helpers/buildBoard";
import Modal from "./components/modal-end/modal-end";

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
  const [gameEnded, setGameEnded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [win, setWin] = useState(false);

  const resetLetterClicked = () => {
    setLettersClicked("");
    setFirstLetterCoordinates(-1);
    setDirectionWhenClicked("");
    setAllCoordinates([]);
  };

  const handleKeyEvent = useCallback((event) => {
    if (event.key === "Escape") {
      resetLetterClicked();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  });

  useEffect(() => {
    //set board and words, when game starts
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
          console.log("YOU LOSE!");
          setGameStarted(false);
          resetLetterClicked();
          setModalOpen(true);
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
      setWin(false);
    } else {
      setGameStarted(true);
      setGameEnded(false);
      setTotalPoints(0);
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
        multiplier = 1.5;
        break;
      case "Medium":
        multiplier = 2.5;
        break;
      case "Hard":
        multiplier = 3;
        break;
    }

    let points = word.length * multiplier * 10 + timer + totalPoints;
    setTotalPoints(points);
  };

  const handleWordsFound = (newLetters) => {
    let allWordsFound = wordsFound;
    allWordsFound.push(newLetters);
    setWordsFound(allWordsFound);
    handleTotalPoints(newLetters);
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
      //CLICK ONE LETTER AT A TIME

      // const firstCoordinates = firstLetterCoordinates;
      // const dir = directionWhenClicked;
      // let lastCoordinate = -1;
      // if (allCoordinates.length !== 0) {
      //   lastCoordinate = allCoordinates[allCoordinates.length - 1];
      //   console.log("Last coordenate " + lastCoordinate);
      // }
      // //First time clicking or after completing a word
      // if (firstCoordinates === -1) {
      //   handleFirstLetterCoordinates(coordinates);
      //   const currentLetter = lettersClicked;
      //   const newLetters = currentLetter + letter;
      //   setLettersClicked(newLetters);
      // }
      // //Second time clicking, defines which direction to go
      // if (firstCoordinates !== -1 && dir === "") {
      //   let correct = false;
      //   if (coordinates === firstCoordinates - boardSize + 1) {
      //     setDirectionWhenClicked("diagonalBottomRight");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates - boardSize) {
      //     setDirectionWhenClicked("downTop");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates - boardSize - 1) {
      //     setDirectionWhenClicked("diagonalBottomLeft");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates + 1) {
      //     setDirectionWhenClicked("leftRight");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates + boardSize + 1) {
      //     setDirectionWhenClicked("diagonalTopRight");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates + boardSize) {
      //     setDirectionWhenClicked("topDown");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates + boardSize - 1) {
      //     setDirectionWhenClicked("diagonalTopLeft");
      //     correct = true;
      //   }
      //   if (coordinates === firstCoordinates - 1) {
      //     setDirectionWhenClicked("rightLeft");
      //     correct = true;
      //   }
      //   if (correct) {
      //     handleAllCoordinates(coordinates);
      //     const currentLetter = lettersClicked;
      //     const newLetters = currentLetter + letter;
      //     setLettersClicked(newLetters);
      //   }
      // }
      // //after having a diretion defined, only allows to insert letters in that direction
      // if (directionWhenClicked !== "") {
      //   switch (directionWhenClicked) {
      //     case "diagonalBottomRight":
      //       if (coordinates === lastCoordinate - boardSize + 1) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "downTop":
      //       if (coordinates === lastCoordinate - boardSize) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "diagonalBottomLeft":
      //       if (coordinates === lastCoordinate - boardSize - 1) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "leftRight":
      //       if (coordinates === lastCoordinate + 1) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "diagonalTopRight":
      //       if (coordinates === lastCoordinate + boardSize + 1) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "topDown":
      //       if (coordinates === lastCoordinate + boardSize) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "diagonalTopLeft":
      //       if (coordinates === lastCoordinate + boardSize - 1) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //     case "rightLeft":
      //       if (coordinates === lastCoordinate - 1) {
      //         handleAllCoordinates(coordinates);
      //         const currentLetter = lettersClicked;
      //         const newLetters = currentLetter + letter;
      //         setLettersClicked(newLetters);
      //       }
      //       break;
      //   }
      // }

      //   //CLICK FIRST AND LAST LETTER
      const firstCoordinates = firstLetterCoordinates;

      //first time clicking, decides starting point
      if (firstCoordinates === -1) {
        handleFirstLetterCoordinates(coordinates);
        const currentLetter = lettersClicked;
        const newLetters = currentLetter + letter;
        setLettersClicked(newLetters);
        return;
      }

      const distance = firstCoordinates - coordinates;

      let diff =
        Math.abs(distance) >= boardSize
          ? Math.abs((firstCoordinates % boardSize) - (coordinates % boardSize))
          : Math.abs(distance);

      if (diff === 0) {
        diff = Math.abs(Math.trunc(distance / boardSize));
      }

      let topOrBottom = undefined; //false = top, true = bottom
      let leftOrRight = undefined; //false = left, true = right
      let upOrDown = undefined; //false = up, true = down
      let dir; //direction in which it moves

      if (distance > 0) {
        topOrBottom = false; //top
      } else {
        topOrBottom = true; //bottom
      }

      if (Math.abs(distance) !== diff) {
        if (topOrBottom) {
          if (firstCoordinates + boardSize * diff + diff === coordinates) {
            leftOrRight = true; //right
            upOrDown = false;
          }
          if (firstCoordinates + boardSize * diff === coordinates)
            upOrDown = true; //down
          if (firstCoordinates + boardSize * diff - diff === coordinates) {
            leftOrRight = false; //left
            upOrDown = false;
          }
        } else {
          if (firstCoordinates - boardSize * diff + diff === coordinates) {
            leftOrRight = true; //right
            upOrDown = true;
          }
          if (firstCoordinates - boardSize * diff === coordinates) {
            upOrDown = false; //up
          }
          if (firstCoordinates - boardSize * diff - diff === coordinates) {
            leftOrRight = false; //left
            upOrDown = true;
          }
        }

        if (topOrBottom) {
          //bottom
          if (leftOrRight) {
            //right
            dir = "diagonalTopRight";
          } else if (upOrDown) {
            dir = "upDown";
          } else if (!leftOrRight) {
            //left
            dir = "diagonalTopLeft";
          }
        } else {
          //top
          if (leftOrRight) {
            //right
            dir = "diagonalBottomRight";
          } else if (!upOrDown) {
            dir = "downUp";
          } else if (!leftOrRight) {
            //left
            dir = "diagonalBottomLeft";
          }
        }
      } else {
        if (topOrBottom) {
          dir = "leftRight";
        } else {
          dir = "rightLeft";
        }
      }

      let newLetters = lettersClicked;

      switch (dir) {
        case "diagonalTopRight":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates + boardSize * (i + 1) + i + 1];
          }
          break;
        case "diagonalTopLeft":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates + boardSize * (i + 1) - i - 1];
          }
          break;
        case "diagonalBottomRight":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates - boardSize * (i + 1) + i + 1];
          }
          break;
        case "diagonalBottomLeft":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates - boardSize * (i + 1) - i - 1];
          }
          break;
        case "downUp":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates - boardSize * (i + 1)];
          }
          break;
        case "upDown":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates + boardSize * (i + 1)];
          }
          break;
        case "rightLeft":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates - (i + 1)];
          }
          break;
        case "leftRight":
          for (let i = 0; i < diff; ++i) {
            newLetters += board[firstCoordinates + (i + 1)];
          }
          break;
      }

      setLettersClicked(newLetters);

      if (wordsInside.includes(newLetters)) {
        handleWordsFound(newLetters);
        resetLetterClicked();
      }
      console.log("fpound: " + wordsFound + " inside " + wordsInside);
      if (wordsFound.length === wordsInside.length) {
        setGameStarted(false);
        setWordsFound([]);
        resetLetterClicked();
        setModalOpen(true);
        setWin(true);
      }
    }
  };

  function checkInput(input) {
    return words.includes(input.toUpperCase());
    //if false, não existe, if true existe
  }

  function getWord() {
    let w = window.prompt("New Word: ");
    if (!checkInput(w)) {
      words.push(w.toUpperCase());
      window.alert("DONE!");
      return true;
    }
    window.alert("ERROR! Try again!");
    return false;
  }

  return (
    <>
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
            getWord={getWord}
          />
          <WordPanel
            gameStarted={gameStarted}
            words={wordsInside}
            lettersClicked={lettersClicked}
            resetLetterClicked={resetLetterClicked}
            wordsFound={wordsFound}
          />
          <GamePanel
            difficulty={difficulty}
            gameStarted={gameStarted}
            board={board}
            handleLettersClicked={handleLettersClicked}
          />
        </main>
        <div style={{ display: "contents" }}>
          {modalOpen ? (
            <Modal
              setOpenModal={setModalOpen}
              totalPoints={totalPoints}
              win={win}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

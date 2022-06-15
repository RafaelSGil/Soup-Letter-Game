import React from "react";
import { useState } from "react";

import WordPanel from "../word-panel/word-panel";
import "./word-panel.css";

function WordList(props) {
  const { difficulty, gameStarted, words } = props;

  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked((current) => !current);
  };

  // const palavras = [
  //   "teta",
  //   "tita",
  //   "tota",
  //   "testes",
  //   "saddsada",
  //   "sad",
  //   "cabeca rapada",
  //   "gilEanes",
  // ];

  let gameClass = gameStarted ? "" : "hide";

  return (
    <>
      <div className={`fundo ${gameClass}`}>
        <div className="title ">WORDS</div>
        <ul className="words-list">
          {words.map((word) => (
            <li
              style={{
                textDecoration: isClicked ? "line-through" : "none",
                background: isClicked
                  ? "rgb(168, 163, 163)"
                  : "rgb(255, 255, 255)",
              }}
              //falta meter a mostrar apenas quando startGame
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleIsClicked}></button>
    </>
  );
}

export default WordList;

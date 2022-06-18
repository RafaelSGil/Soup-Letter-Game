import React from "react";
import { useState } from "react";

import Word from "../word-panel/word";
import "./word-panel.css";

function WordList(props) {
  const {
    gameStarted,
    words,
    lettersClicked,
    resetLetterClicked,
    wordsFound,
    onWordFound,
  } = props;

  let gameClass = gameStarted ? "" : "hide";

  return (
    <>
      <div className={`fundo ${gameClass}`}>
        <ul className="words-list">
          {words.map((word) => (
            <Word
              word={word}
              lettersClicked={lettersClicked}
              resetLetterClicked={resetLetterClicked}
              wordsFound={wordsFound}
              onWordFound={onWordFound}
            />
          ))}
        </ul>
        <div>
          <p>{lettersClicked}</p>
        </div>
      </div>
    </>
  );
}

export default WordList;

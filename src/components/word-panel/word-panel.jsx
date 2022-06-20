import React from "react";

import Word from "../word-panel/word";
import "./word-panel.css";

function WordList(props) {
  const { gameStarted, words, lettersClicked, resetLetterClicked, wordsFound } =
    props;

  let gameClass = gameStarted ? "" : "hide";

  return (
    <>
      <div className={`fundo ${gameClass}`}>
        <ul className="words-list">
          {words.map((word) => (
            <Word word={word} wordsFound={wordsFound} />
          ))}
        </ul>
        <div>
          <p>{lettersClicked === "" ? "Not selected" : lettersClicked}</p>
        </div>
        <button onClick={resetLetterClicked}>reset</button>
      </div>
    </>
  );
}

export default WordList;

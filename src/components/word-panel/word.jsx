import React from "react";
import { useState } from "react";

function Word(props) {
  const { word, lettersClicked, resetLetterClicked, wordsFound, onWordFound } =
    props;
  function isFound(word) {
    if (word === lettersClicked) {
      onWordFound(word);
      resetLetterClicked();
    }
  }

  return (
    <li
      onClick={isFound(word)}
      style={{
        textDecoration: wordsFound.includes(word) ? "line-through" : "none",
        background: wordsFound.includes(word)
          ? "rgb(168, 163, 163)"
          : "rgb(255, 255, 255)",
      }}
    >
      {word}
    </li>
  );
}

export default Word;

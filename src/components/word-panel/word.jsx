import React from "react";

function Word(props) {
  const { word, wordsFound } = props;

  return (
    <li
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

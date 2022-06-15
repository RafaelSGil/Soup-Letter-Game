import React from "react";
import { useState } from "react";

import WordPanel from "../word-panel/word-panel";
import "./word-panel.css";

function WordList(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked((current) => !current);
  };

  const palavras = [
    "teta",
    "tita",
    "tota",
    "testes",
    "saddsada",
    "sad",
    "cabeca rapada",
    "gilEanes",
  ];

  return (
    <>
      <div className="fundo">
        <div className="title">WORDS</div>
        <ul className="words-list">
          {palavras.map((palavra) => (
            <li
              style={{
                textDecoration: isClicked ? "line-through" : "none",
                background: isClicked
                  ? "rgb(168, 163, 163)"
                  : "rgb(255, 255, 255)",
              }}
              //falta meter a mostrar apenas quando startGame
            >
              {palavra}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleIsClicked}></button>
    </>
  );
}

export default WordList;

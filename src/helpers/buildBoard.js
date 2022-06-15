import {
  ALPHABET,
  words,
  BOARD_EASY,
  WORDS_EASY,
  BOARD_MEDIUM,
  BOARD_HARD,
  WORDS_MEDIUM,
  WORDS_HARD,
} from "../constants";

let directionsDisplacements = {
  leftRight: function () {
    return [1, 0];
  },
  rightLeft: function () {
    return [-1, 0];
  },
  topDown: function () {
    return [0, 1];
  },
  downUp: function () {
    return [0, -1];
  },
  diagonalTopRight: function () {
    return [1, 1];
  },
  diagonalTopLeft: function () {
    return [-1, 1];
  },
  diagonalBottomRight: function () {
    return [1, -1];
  },
  diagonalBottomLeft: function () {
    return [-1, -1];
  },
};

let checkDirections = {
  leftRight: function (x, y, lines, columns, wordLength) {
    return columns >= x + wordLength;
  },
  rightLeft: function (x, y, lines, columns, wordLength) {
    return x + 1 >= wordLength;
  },
  topDown: function (x, y, lines, columns, wordLength) {
    return lines >= y + wordLength;
  },
  downUp: function (x, y, lines, columns, wordLength) {
    return y + 1 >= wordLength;
  },
  diagonalTopRight: function (x, y, lines, columns, wordLength) {
    return columns >= x + wordLength && lines >= y + wordLength;
  },
  diagonalTopLeft: function (x, y, lines, columns, wordLength) {
    return x + 1 >= wordLength && lines >= y + wordLength;
  },
  diagonalBottomRight: function (x, y, lines, columns, wordLength) {
    return columns >= x + wordLength && y + 1 >= wordLength;
  },
  diagonalBottomLeft: function (x, y, lines, columns, wordLength) {
    return x + 1 >= wordLength && y + 1 >= wordLength;
  },
};

function buildBoard(Size, wordBank) {
  let boardSize = BOARD_HARD;
  let squares = new Array(boardSize);
  let words = [];
  let direction;
  let position;
  let attempt;
  let success;
  let xDisplacement;
  let yDisplacement;
  let word;
  let x;
  let y;
  let i;
  let j;
  let numberWords = WORDS_HARD;

  if (Size === "Easy") {
    boardSize = BOARD_EASY;
    numberWords = WORDS_EASY;
  } else if (Size === "Medium") {
    boardSize = BOARD_MEDIUM;
    numberWords = WORDS_MEDIUM;
  }

  for (i = 0; i < boardSize; i++) {
    squares[i] = new Array(boardSize);
    for (j = 0; j < boardSize; j++) squares[i][j] = " ";
  }

  for (i = 0; i < numberWords; i++) {
    success = false;
    while (!success) {
      word = wordBank[Math.round(Math.random() * (wordBank.length - 1))];

      if (boardSize < word.length || words.includes(word)) continue;
      for (attempt = 0; attempt < 100 && !success; attempt++) {
        //direction = Math.round(Math.random() * 7) + 1;
        x = Math.round(Math.random() * (boardSize - 1));
        y = Math.round(Math.random() * (boardSize - 1));
        position = 0;
        switch (Math.round(Math.random() * 7) + 1) {
          default:
            [xDisplacement, yDisplacement] =
              directionsDisplacements.leftRight();
            direction = checkDirections.leftRight;
            break;
          case 2:
            [xDisplacement, yDisplacement] =
              directionsDisplacements.diagonalTopRight();
            direction = checkDirections.diagonalTopRight;
            break;
          case 3:
            [xDisplacement, yDisplacement] = directionsDisplacements.topDown();
            direction = checkDirections.topDown;
            break;
          case 4:
            [xDisplacement, yDisplacement] =
              directionsDisplacements.diagonalTopLeft();
            direction = checkDirections.diagonalTopLeft;
            break;
          case 5:
            [xDisplacement, yDisplacement] =
              directionsDisplacements.rightLeft();
            direction = checkDirections.rightLeft;
            break;
          case 6:
            [xDisplacement, yDisplacement] =
              directionsDisplacements.diagonalBottomLeft();
            direction = checkDirections.diagonalBottomLeft;
            break;
          case 7:
            [xDisplacement, yDisplacement] = directionsDisplacements.downUp();
            direction = checkDirections.downUp;
            break;
          case 8:
            [xDisplacement, yDisplacement] =
              directionsDisplacements.diagonalBottomRight();
            direction = checkDirections.diagonalBottomRight;
            break;
        }
        if (!direction(x, y, boardSize, boardSize, word.length)) {
          continue;
        }
        for (position = 0; position < word.length; position++) {
          if (
            squares[y + position * yDisplacement][
              x + position * xDisplacement
            ] === " "
          )
            squares[y + position * yDisplacement][
              x + position * xDisplacement
            ] = word[position];
          else {
            for (position = position - 1; 0 <= position; position--)
              squares[y + position * yDisplacement][
                x + position * xDisplacement
              ] = " ";
            break;
          }
        }
        success = position === word.length;
      }
    }
    words.push(word);
  }
  /*

     For debug purposes, this section has been taken out.

     */
  for (i = 0; i < boardSize; i++) {
    for (j = 0; j < boardSize; j++)
      if (squares[i][j] === " ")
        squares[i][j] =
          ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
  }
  return [squares.flat(), words];
}

export default buildBoard;

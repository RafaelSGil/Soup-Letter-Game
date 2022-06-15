import { ALPHABET, words, BOARD_EASY, WORDS_EASY } from "../constants";

// const directions = {
//   leftRight: function (x, y, displacement) {
//     return { x: x + displacement, y: y };
//   },
//   rightLeft: function (x, y, displacement) {
//     return { x: x - displacement, y: y };
//   },
//   topDown: function (x, y, displacement) {
//     return { x: x, y: y + displacement };
//   },
//   downUp: function (x, y, displacement) {
//     return { x: x, y: y - displacement };
//   },
//   diagonalTopRight: function (x, y, displacement) {
//     return { x: x + displacement, y: y + displacement };
//   },
//   diagonalTopLeft: function (x, y, displacement) {
//     return { x: x - displacement, y: y + displacement };
//   },
//   diagonalBottomRight: function (x, y, displacement) {
//     return { x: x + displacement, y: y - displacement };
//   },
//   diagonalBottomLeft: function (x, y, displacement) {
//     return { x: x - displacement, y: y - displacement };
//   },
// };

// let directionsDisplacements = {
//   leftRight: function () {
//     return [1, 0];
//   },
//   rightLeft: function () {
//     return [-1, 0];
//   },
//   topDown: function () {
//     return [0, 1];
//   },
//   downUp: function () {
//     return [0, -1];
//   },
//   diagonalTopRight: function () {
//     return [1, 1];
//   },
//   diagonalTopLeft: function () {
//     return [-1, 1];
//   },
//   diagonalBottomRight: function () {
//     return [1, -1];
//   },
//   diagonalBottomLeft: function () {
//     return [-1, -1];
//   },
// };

// let checkDirections = {
//   leftRight: function (x, y, lines, columns, wordLength) {
//     return columns >= x + wordLength;
//   },
//   rightLeft: function (x, y, lines, columns, wordLength) {
//     return x + 1 >= wordLength;
//   },
//   topDown: function (x, y, lines, columns, wordLength) {
//     return lines >= y + wordLength;
//   },
//   downUp: function (x, y, lines, columns, wordLength) {
//     return y + 1 >= wordLength;
//   },
//   diagonalTopRight: function (x, y, lines, columns, wordLength) {
//     return columns >= x + wordLength && lines >= y + wordLength;
//   },
//   diagonalTopLeft: function (x, y, lines, columns, wordLength) {
//     return x + 1 >= wordLength && lines >= y + wordLength;
//   },
//   diagonalBottomRight: function (x, y, lines, columns, wordLength) {
//     return columns >= x + wordLength && y + 1 >= wordLength;
//   },
//   diagonalBottomLeft: function (x, y, lines, columns, wordLength) {
//     return x + 1 >= wordLength && y + 1 >= wordLength;
//   },
// };

function buildBoard(
  numberWords = WORDS_EASY,
  boardSize = BOARD_EASY,
  wordBank = words
) {
  let squares = new Array(boardSize);
  let words = [];
  let direction;
  let position;
  let attempt;
  let success;
  let xOffset;
  let yOffset;
  let word;
  let x;
  let y;
  let i;
  let j;

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
        direction = Math.round(Math.random() * 7) + 1;
        x = Math.round(Math.random() * (boardSize - 1));
        y = Math.round(Math.random() * (boardSize - 1));
        position = 0;
        switch (direction) {
          default: // left to right
            xOffset = 1;
            yOffset = 0;
            break;
          case 2: // left top to right bottom
            xOffset = 1;
            yOffset = 1;
            break;
          case 3: // top to bottom
            xOffset = 0;
            yOffset = 1;
            break;
          case 4: // right top to left bottom
            xOffset = -1;
            yOffset = 1;
            break;
          case 5: // right to left
            xOffset = -1;
            yOffset = 0;
            break;
          case 6: // right bottom to left top
            xOffset = -1;
            yOffset = -1;
            break;
          case 7: // bottom to top
            xOffset = 0;
            yOffset = -1;
            break;
          case 8: // left bottom to right top
            xOffset = 1;
            yOffset = -1;
            break;
        }
        if (
          x + word.length * xOffset < 0 ||
          boardSize <= x + word.length * xOffset ||
          y + word.length * yOffset < 0 ||
          boardSize <= y + word.length * yOffset
        ) {
          continue;
        }
        for (position = 0; position < word.length; position++) {
          if (squares[y + position * yOffset][x + position * xOffset] === " ")
            squares[y + position * yOffset][x + position * xOffset] =
              word[position];
          else {
            for (position = position - 1; 0 <= position; position--)
              squares[y + position * yOffset][x + position * xOffset] = " ";
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

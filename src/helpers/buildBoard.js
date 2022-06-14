import { ALPHABET, words } from "../constants";

const directions = {
  leftRight: function (x, y, displacement) {
    return { x: x + displacement, y: y };
  },
  rightLeft: function (x, y, displacement) {
    return { x: x - displacement, y: y };
  },
  topDown: function (x, y, displacement) {
    return { x: x, y: y + displacement };
  },
  downUp: function (x, y, displacement) {
    return { x: x, y: y - displacement };
  },
  diagonalTopRight: function (x, y, displacement) {
    return { x: x + displacement, y: y + displacement };
  },
  diagonalTopLeft: function (x, y, displacement) {
    return { x: x - displacement, y: y + displacement };
  },
  diagonalBottomRight: function (x, y, displacement) {
    return { x: x + displacement, y: y - displacement };
  },
  diagonalBottomLeft: function (x, y, displacement) {
    return { x: x - displacement, y: y - displacement };
  },
};

const directionsDisplacements = {
  leftRight: function () {
    return { x: 1, y: 0 };
  },
  rightLeft: function () {
    return { x: -1, y: 0 };
  },
  topDown: function () {
    return { x: 0, y: 1 };
  },
  downUp: function () {
    return { x: 0, y: -1 };
  },
  diagonalTopRight: function () {
    return { x: 1, y: 1 };
  },
  diagonalTopLeft: function () {
    return { x: -1, y: 1 };
  },
  diagonalBottomRight: function () {
    return { x: 1, y: -1 };
  },
  diagonalBottomLeft: function () {
    return { x: -1, y: -1 };
  },
};

const checkDirections = {
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

function buildBoard(timer, size, numberWords) {
  let board = new Array(size);
  let location;
  let direction, directionDisplacement, directionCheck;
  let x, xDisplacement;
  let y, yDisplacement;
  let word,
    wordsInserted = [];
  let inBoard;
  let attempts;

  for (let i = 0; i < size; ++i) {
    board[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      board[i][j] = " ";
    }
  }

  for (let i = 0; i < numberWords; ++i) {
    inBoard = false;
    while (!inBoard) {
      word = words[Math.round(Math.random() * (words.length - 1))]; //select a random word

      if (size < word.length || wordsInserted.includes(word)) continue; //word bigger than board size OR already inside the board, next

      for (attempts = 0; attempts < 100 && !inBoard; ++attempts) {
        x = Math.round(Math.random() * (size - 1));
        y = Math.round(Math.random() * (size - 1));
        location = 0;
        switch (Math.round(Math.random() * 7) - 1) {
          default:
            direction = directions.leftRight;
            directionCheck = checkDirections.leftRight;
            directionDisplacement = directionsDisplacements.leftRight;
            break;
          case 2:
            direction = directions.rightLeft;
            directionCheck = checkDirections.rightLeft;
            directionDisplacement = directionsDisplacements.rightLeft;
            break;
          case 3:
            direction = directions.topDown;
            directionCheck = checkDirections.topDown;
            directionDisplacement = directionsDisplacements.topDown;
            break;
          case 4:
            direction = directions.downUp;
            directionCheck = checkDirections.downUp;
            directionDisplacement = directionsDisplacements.downUp;
            break;
          case 5:
            direction = directions.diagonalTopLeft;
            directionCheck = checkDirections.diagonalTopLeft;
            directionDisplacement = directionsDisplacements.diagonalTopLeft;
            break;
          case 6:
            direction = directions.diagonalTopRight;
            directionCheck = checkDirections.diagonalTopRight;
            directionDisplacement = directionsDisplacements.diagonalTopRight;
            break;
          case 7:
            direction = directions.diagonalBottomLeft;
            directionCheck = checkDirections.diagonalBottomLeft;
            directionDisplacement = directionsDisplacements.diagonalBottomLeft;
            break;
          case 8:
            direction = directions.diagonalBottomRight;
            directionCheck = checkDirections.diagonalBottomRight;
            directionDisplacement = directionsDisplacements.diagonalBottomRight;
            break;
        }

        [xDisplacement, yDisplacement] = directionDisplacement();

        if (
          x + word.length * xDisplacement < 0 ||
          size <= x + word.length * xDisplacement ||
          y + word.length * yDisplacement < 0 ||
          size <= y + word.length * yDisplacement
        ) {
          continue;
        }

        for (location = 0; location < word.length; location++) {
          if (
            board[y + location * yDisplacement][
              x + location * xDisplacement
            ] === " "
          ) {
            board[y + location * yDisplacement][x + location * xDisplacement] =
              word[location];
          } else {
            for (location = location - 1; 0 <= location; location--) {
              board[y + location * yDisplacement][
                x + location * xDisplacement
              ] = " ";
              break;
            }
          }
        }

        inBoard = location === word.length;
      }
    }
    wordsInserted.push(word);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === " ") {
        board[i][j] =
          ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
      }
    }
  }

  return [board.flat(), wordsInserted];
}

export default buildBoard;

import {
  ALPHABET,
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
    return columns > x + (wordLength - 1);
  },
  rightLeft: function (x, y, lines, columns, wordLength) {
    return 0 <= x + 1 - wordLength;
  },
  topDown: function (x, y, lines, columns, wordLength) {
    return lines > y + (wordLength - 1);
  },
  downUp: function (x, y, lines, columns, wordLength) {
    return 0 <= y + 1 - wordLength;
  },
  diagonalTopRight: function (x, y, lines, columns, wordLength) {
    return (
      checkDirections.leftRight(x, y, lines, columns, wordLength) &&
      checkDirections.topDown(x, y, lines, columns, wordLength)
    );
  },
  diagonalTopLeft: function (x, y, lines, columns, wordLength) {
    return (
      checkDirections.rightLeft(x, y, lines, columns, wordLength) &&
      checkDirections.topDown(x, y, lines, columns, wordLength)
    );
  },
  diagonalBottomRight: function (x, y, lines, columns, wordLength) {
    return (
      checkDirections.leftRight(x, y, lines, columns, wordLength) &&
      checkDirections.downUp(x, y, lines, columns, wordLength)
    );
  },
  diagonalBottomLeft: function (x, y, lines, columns, wordLength) {
    return (
      checkDirections.rightLeft(x, y, lines, columns, wordLength) &&
      checkDirections.downUp(x, y, lines, columns, wordLength)
    );
  },
};

let putWord = {
  leftRight: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y][x + i] === "1")) {
        for (let j = i - 1; 0 <= j; j--) {
          board[y][x + j] = "1";
        }
        return false;
      }

      board[y][x + i] = word[i];
    }

    return true;
  },
  rightLeft: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y][x - i] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y][x - j] = "1";
        }
        return false;
      }

      board[y][x - i] = word[i];
    }
    return true;
  },
  topDown: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y + i][x] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y + j][x] = "1";
        }
        return false;
      }

      board[y + i][x] = word[i];
    }
    return true;
  },
  downUp: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y - i][x] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y - j][x] = "1";
        }
        return false;
      }

      board[y - i][x] = word[i];
    }

    return true;
  },
  diagonalTopRight: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y + i][x + i] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y + j][x + j] = "1";
        }
        return false;
      }

      board[y + i][x + i] = word[i];
    }
    return true;
  },
  diagonalTopLeft: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y + i][x - i] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y + j][x - j] = "1";
        }
        return false;
      }

      board[y + i][x - i] = word[i];
    }
    return true;
  },
  diagonalBottomRight: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y - i][x + i] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y - j][x + j] = "1";
        }
        return false;
      }

      board[y - i][x + i] = word[i];
    }
    return true;
  },
  diagonalBottomLeft: function (
    x, //initial position
    y, //initial position
    word, //word to insert in the board
    board //game board
  ) {
    for (let i = 0; i < word.length; ++i) {
      if (!(board[y - i][x - i] === "1")) {
        for (let j = i - 1; 0 <= j; --j) {
          board[y - j][x - j] = "1";
        }
        return false;
      }
      board[y - i][x - i] = word[i];
    }
    return true;
  },
};

function buildBoard(level, wordBank) {
  let boardSize = BOARD_EASY;
  let numberWords = WORDS_EASY;

  if (level === "Hard") {
    boardSize = BOARD_HARD;
    numberWords = WORDS_HARD;
  } else if (level === "Medium") {
    boardSize = BOARD_MEDIUM;
    numberWords = WORDS_MEDIUM;
  }

  let board = Array.apply(null, Array(boardSize));
  let words = [];
  let direction;
  let attempt;
  let success;
  let word;
  let x;
  let y;
  let insert;

  for (let i = 0; i < boardSize; i++) {
    board[i] = Array.apply(null, Array(boardSize));
  }

  for (let i = 0; i < boardSize; ++i) {
    for (let j = 0; j < boardSize; ++j) {
      board[i][j] = "1";
    }
  }

  for (let i = 0; i < numberWords; i++) {
    success = false;
    while (!success) {
      word = wordBank[Math.round(Math.random() * (wordBank.length - 1))];

      if (boardSize < word.length || words.includes(word)) continue;
      for (attempt = 0; attempt < 100 && !success; attempt++) {
        x = Math.round(Math.random() * (boardSize - 1)); //random column, x axes
        y = Math.round(Math.random() * (boardSize - 1)); //random line, y axes
        switch (Math.round(Math.random() * 7) + 1) {
          default:
            direction = checkDirections.leftRight;
            insert = putWord.leftRight;
            break;
          case 2:
            direction = checkDirections.rightLeft;
            insert = putWord.rightLeft;
            break;
          case 3:
            direction = checkDirections.topDown;
            insert = putWord.topDown;
            break;
          case 4:
            direction = checkDirections.downUp;
            insert = putWord.downUp;
            break;
          case 5:
            direction = checkDirections.diagonalTopRight;
            insert = putWord.diagonalTopRight;
            break;
          case 6:
            direction = checkDirections.diagonalTopLeft;
            insert = putWord.diagonalTopLeft;
            break;
          case 7:
            direction = checkDirections.diagonalBottomRight;
            insert = putWord.diagonalBottomRight;
            break;
          case 8:
            direction = checkDirections.diagonalBottomLeft;
            insert = putWord.diagonalBottomLeft;
            break;
        }
        if (!direction(x, y, boardSize, boardSize, word.length)) {
          continue;
        }

        success = insert(x, y, word, board);
      }
    }
    words.push(word);
  }
  /*

     For debug purposes, thi.s section has been taken out.

     */
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++)
      if (board[i][j] === "1")
        board[i][j] =
          ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
  }
  return [board.flat(), words];
}

export default buildBoard;

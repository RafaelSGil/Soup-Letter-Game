export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export let words = [
  "CRY",
  "FOSSIL",
  "POCKET",
  "MILE",
  "JELLY",
  "WELL",
  "CURTAIN",
  "PASSIVE",
  "ABUNDANT",
  "VISUAL",
  "PEAK",
  "MOTHER",
  "DEADLY",
  "FLAT",
  "DAIRY",
  "INJECT",
  "GLOOM",
  "LARGE",
  "SYMBOL",
  "MARS",
  "ANGLE",
  "COMPLAIN",
  "TIRED",
  "BREED",
  "DATE",
  "COURTESY",
  "TRACE",
  "TROUBLE",
  "LITIGATION",
  "SATISFACTION",
  "PREDATOR",
  "COMPENSATION",
  "PRESCRIPTION",
  "THRESHOLD",
];

export const BOARD_EASY = 10;
export const WORDS_EASY = 6;

export const BOARD_MEDIUM = 15;
export const WORDS_MEDIUM = 8;

export const BOARD_HARD = 20;
export const WORDS_HARD = 10;

export const TIMEOUT = 200;

export let checkDirections = {
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

export let putWord = {
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

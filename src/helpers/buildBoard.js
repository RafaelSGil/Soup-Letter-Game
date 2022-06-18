import {
  ALPHABET,
  BOARD_EASY,
  WORDS_EASY,
  BOARD_MEDIUM,
  BOARD_HARD,
  WORDS_MEDIUM,
  WORDS_HARD,
  checkDirections,
  putWord,
} from "../constants";

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

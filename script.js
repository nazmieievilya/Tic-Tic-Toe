const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".box");
const resultBox = document.querySelector(".result");
const playerTitle = document.querySelector("h1");
const background = document.querySelector("body");
const replayBtn = document.querySelector("button");
let array = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let player;
let ai;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function decidePlayer() {
  player = random(1, 2) === 1 ? 1 : 2; // rand
  player = 2;
  // you are "O"
  ai = player == 1 ? 2 : 1;
  // replaced X O
  playerTitle.textContent = `You Are "${player == 1 ? "O" : "X"}"`;
}

function clear() {
  boxes.forEach((el) => (el.textContent = ""));
}
function replay() {
  array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  resultBox.textContent = "";
  background.style.backgroundColor = "rgb(52, 58, 63)";
  clear();
  render(array);
}
function displayResult(result) {
  console.log(result);
  resultBox.textContent =
    result == 0 ? "Toe" : player == result ? "You Win!" : "You Lose!";
  resultBox.style.opacity = 1;
  background.style.backgroundColor =
    result == 0
      ? "rgb(159, 174, 95)"
      : player == result
      ? "rgb(85, 167, 95)"
      : "rgb(164, 93, 109)";
}

function minimax(board, depth, isMaximizing) {
  // return 1;
  let result = isSolved(board);
  // if 1 = 1
  // if 2 = -1
  // 0 = 0
  if (result !== -1) {
    return result == 1 ? 1 : result == 2 ? -1 : 0;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = 0;
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          board[i][j] = player;
          let score = minimax(board, depth + 1, true);
          board[i][j] = 0;
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function computerQueue() {
  let spaceLeft = 0;
  [...array[0], ...array[1], ...array[2]].forEach((el) => {
    if (el == 0) spaceLeft++;
  });
  if (spaceLeft == 0) return;
  let isFilled = true;
  let isLeftEmpty = 0;
  [...array[0], ...array[1], ...array[2]].forEach((el) => {
    if (el == 0) isLeftEmpty++;
  });
  let bestMove;
  let bestScore = -Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[i][j] == 0) {
        array[i][j] = ai;
        let score = minimax(array, 0, false);

        array[i][j] = 0;
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
  }
  array[bestMove.i][bestMove.j] = ai;
}

function render(array) {
  const newArr = [...array[0], ...array[1], ...array[2]];
  newArr.forEach((el, i) =>
    boxes[i].insertAdjacentText(
      "afterbegin",
      el == 1 ? "O" : el == 2 ? "X" : ""
    )
  );
}

function run(event) {
  let result = isSolved(array);
  if (result >= 0) return;
  if (!player) decidePlayer();
  const number = event.target.closest(".box")?.dataset.number;
  // if already filled
  if (
    array[Math.trunc(number / 3.1)][
      number - 1 - 3 * Math.trunc(number / 3.1)
    ] != 0
  )
    return;
  array[Math.trunc(number / 3.1)][number - 1 - 3 * Math.trunc(number / 3.1)] =
    player == 1 ? 1 : 2;
  clear();
  result = isSolved(array);
  // calc emptySpace

  player == result ? null : computerQueue();
  result = isSolved(array);
  if (result >= 0) displayResult(result);
  render(array);
  // check how many empty
}

function isSolved(board) {
  let isFinished = true;

  // Check is X won
  let isXWin = false;
  let isOWin = false;
  // horizontal
  board.forEach((el) => {
    if (el.every((x) => x === 1)) isXWin = true;
    if (el.every((x) => x === 2)) isOWin = true;
  });
  // vertical
  board
    .map((_, i) => board.map((el) => el[i]))
    .forEach((el) => {
      if (el.every((x) => x === 1)) isXWin = true;
      if (el.every((x) => x === 2)) isOWin = true;
    });
  // for \ and /
  [board.map((el, i) => el[i]), board.map((el, i) => el[2 - i])].forEach(
    (el) => {
      if (el.every((x) => x === 1)) isXWin = true;
      if (el.every((x) => x === 2)) isOWin = true;
    }
  );
  board.forEach((el) => {
    if (el.includes(0)) isFinished = false;
  });
  if (!isFinished && !isXWin && !isOWin) return -1;
  if ((isXWin && isOWin) || (!isXWin && !isOWin)) return 0;
  if (isXWin) return 1;
  if (isOWin) return 2;
}

board.addEventListener("click", run);
replayBtn.addEventListener("click", replay);

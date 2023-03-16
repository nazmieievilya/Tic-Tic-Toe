const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".box");
const resultBox = document.querySelector(".result");
const playerTitle = document.querySelector("h1");
const background = document.querySelector("body");
const replayBtn = document.querySelector("button");

const o = `<svg id='o' xmlns="http://www.w3.org/2000/svg" width="268" height="257" viewBox="0 0 268 257" fill="none">
<path d="M262 128.5C262 195.92 204.932 251 134 251C63.0681 251 6 195.92 6 128.5C6 61.0796 63.0681 6 134 6C204.932 6 262 61.0796 262 128.5Z" stroke="white" stroke-width="15"/>
</svg>`;
const x = `<svg id='x' xmlns="http://www.w3.org/2000/svg" width="238" height="222" viewBox="0 0 238 222" fill="none">
<line x1="7.5" y1="-7.5" x2="304.373" y2="-7.5" transform="matrix(-0.737479 0.67537 -0.685799 -0.727791 230 3)" stroke="white" stroke-width="15" stroke-linecap="round"/>
<line x1="7.5" y1="-7.5" x2="304.373" y2="-7.5" transform="matrix(0.737479 0.67537 -0.685799 0.727791 1.52588e-05 8.37018)" stroke="white" stroke-width="15" stroke-linecap="round"/>
</svg>`;
let array = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let player;
let ai;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

async function setTimer(time) {
  return new Promise((resolve, reject) => {
    if (!time) return reject("No time to wait for");
    setTimeout(() => resolve(time), time * 1000);
  });
}

function decidePlayer() {
  player = random(1, 2) === 1 ? 1 : 2; // rand
  player = 2;
  // you are "O"
  ai = player == 1 ? 2 : 1;
  // replaced X O
  playerTitle.textContent = `You are "${player == 1 ? "O" : "X"}"`;
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
    result == 0 ? "Нічия" : player == result ? "Перемога!" : "Халепа!";
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
const newspaperSpinning = [{ opacity: "0" }, { opacity: "1" }];

const newspaperTiming = {
  duration: 1000,
  // iterations: 1,
};
function render(array) {
  const newArr = [...array[0], ...array[1], ...array[2]];
  newArr.forEach((el, i) => {
    if (boxes[i].childNodes.length > 0) return;
    boxes[i].insertAdjacentHTML("afterbegin", el == 1 ? o : el == 2 ? x : "");
    if (boxes[i].childNodes.length == 0) return;
    boxes[i].childNodes[0].style.opacity = 1;
  });
}

async function run(event) {
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
  // clear();
  result = isSolved(array);
  // calc emptySpace
  render(array);
  await setTimer(0.5);

  player == result ? null : computerQueue();
  result = isSolved(array);
  if (result >= 0) displayResult(result);
  // clear();
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

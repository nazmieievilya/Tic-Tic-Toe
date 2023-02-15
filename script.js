const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".box");
const resultBox = document.querySelector(".result");
const playerTitle = document.querySelector("h1");
const array = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let player;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function decidePlayer() {
  player = random(1, 2) === 1 ? 1 : 2;
  playerTitle.textContent = `You Are "${player == 1 ? "X" : "O"}"`;
}

function clear() {
  boxes.forEach((el) => (el.textContent = ""));
}
function displayResult(result) {
  resultBox.textContent = player == result ? "You Win!" : "You Lose!";
  resultBox.classList.remove("hidden");
}
function computerQueue() {
  let isFilled = true;
  let isLeftEmpty = 0;
  [...array[0], ...array[1], ...array[2]].forEach((el) => {
    if (el == 0) isLeftEmpty++;
  });
  let randomDot = random(1, 9);
  while (isFilled) {
    if (isLeftEmpty < 2) break;
    if (
      array[Math.trunc(randomDot / 3.1)][
        randomDot - 1 - 3 * Math.trunc(randomDot / 3.1)
      ] == 0
    )
      break;

    randomDot = random(1, 9);
  }
  array[Math.trunc(randomDot / 3.1)][
    randomDot - 1 - 3 * Math.trunc(randomDot / 3.1)
  ] = player == 1 ? 2 : 1;
}

function render(array) {
  const newArr = [...array[0], ...array[1], ...array[2]];
  newArr.forEach((el, i) =>
    boxes[i].insertAdjacentText(
      "afterbegin",
      el == 1 ? "X" : el == 2 ? "O" : ""
    )
  );
}

function run(event) {
  if (!player) decidePlayer();
  const number = event.target.closest(".box")?.dataset.number;
  array[Math.trunc(number / 3.1)][number - 1 - 3 * Math.trunc(number / 3.1)] =
    player == 1 ? 1 : 2;
  clear();
  computerQueue();
  render(array);
  const result = isSolved(array);
  if (result >= 0) displayResult(result);
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

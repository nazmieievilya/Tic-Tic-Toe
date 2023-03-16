import { minimax } from "./modules/minmax.js";
import { isSolved } from "./modules/isSolved.js";
import { render, clear } from "./modules/view.js";
import {
  board,
  boxes,
  resultBox,
  playerTitle,
  background,
  replayBtn,
  o,
  x,
} from "./constants.js";

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
  playerTitle.textContent = `You are "${player == 1 ? "O" : "X"}"`;
}

function replay() {
  array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  resultBox.textContent = "";
  background.style.backgroundColor = "rgb(52, 58, 63)";
  clear(boxes);
  render(array, boxes, x, o);
}
function displayResult(result) {
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
        let score = minimax(array, 0, false, player, ai);

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
  // clear();
  result = isSolved(array);
  // calc emptySpace
  render(array, boxes, x, o);

  player == result ? null : computerQueue();
  result = isSolved(array);
  if (result >= 0) displayResult(result);
  // clear();
  render(array, boxes, x, o);
  // check how many empty
}

board.addEventListener("click", run);
replayBtn.addEventListener("click", replay);

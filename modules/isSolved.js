export function isSolved(board) {
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

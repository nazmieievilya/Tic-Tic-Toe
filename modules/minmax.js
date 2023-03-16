import { isSolved } from "./isSolved.js";
export function minimax(board, depth, isMaximizing, player, ai) {
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
          let score = minimax(board, depth + 1, false, player, ai);
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
          let score = minimax(board, depth + 1, true, player, ai);
          board[i][j] = 0;
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

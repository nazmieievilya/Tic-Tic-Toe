# Tic-Tic-Toe

Tic Tac Toe is a classic two-player game played on a 3x3 grid. The game is also known as Noughts and Crosses or Xs and Os. Each player takes turns marking a square on the grid with their symbol (either an "X" or an "O") until one player gets three in a row (horizontally, vertically, or diagonally) or all nine squares are filled without either player getting three in a row.

# Generating opponent decisions with Minimax algorithm

The **Minimax** algorithm works by recursively exploring all possible moves and their outcomes in a game tree. At each level of the tree, the algorithm evaluates the game state and assigns a score to each possible move. In this project, the implementation of the algorithm can be found _in ./modules/minmax.js._ The essence of the algorithm remains the same, the recursive function examines all possible moves of the players and each time calls the function _./modules/isSolved.js_ to check whether any of the players has won

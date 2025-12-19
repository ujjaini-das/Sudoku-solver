// Sudoku Solver using DFS + Backtracking

function solveSudoku(board) {
  if (!isValidInitialBoard(board)) return false;
  return dfs(board);
}

function dfs(board) {
  const empty = findEmpty(board);
  if (!empty) return true;

  const [row, col] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (dfs(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

function findEmpty(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === num)
        return false;
    }
  }
  return true;
}

function isValidInitialBoard(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val !== 0) {
        board[r][c] = 0;
        if (!isValid(board, r, c, val)) return false;
        board[r][c] = val;
      }
    }
  }
  return true;
}

module.exports = { solveSudoku };
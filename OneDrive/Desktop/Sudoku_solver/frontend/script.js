const grid = document.getElementById("sudoku-grid");
const message = document.getElementById("message");

const defaultBoard = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

function createGrid(board) {
  grid.innerHTML = "";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement("input");
      cell.type = "number";
      cell.min = 1;
      cell.max = 9;

      if (board[r][c] !== 0) {
        cell.value = board[r][c];
        cell.disabled = true;
        cell.classList.add("given");
      }
      grid.appendChild(cell);
    }
  }
}

function getBoard() {
  const cells = document.querySelectorAll("input");
  let board = [];
  for (let r = 0; r < 9; r++) {
    board.push([]);
    for (let c = 0; c < 9; c++) {
      const val = cells[r * 9 + c].value;
      board[r][c] = val ? parseInt(val) : 0;
    }
  }
  return board;
}

async function solveSudoku() {
  message.innerText = "Solving...";
  const res = await fetch("http://localhost:5000/api/solve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board: getBoard() })
  });

  const data = await res.json();

  if (!data.solvable) {
    message.innerText = "No solution ❌";
    return;
  }

  createGrid(data.solution);
  message.innerText = "Solved ✅";
}

function clearGrid() {
  createGrid(defaultBoard);
  message.innerText = "";
}

createGrid(defaultBoard);

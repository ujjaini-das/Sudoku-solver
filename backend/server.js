const express = require("express");
const cors = require("cors");
const { solveSudoku } = require("./solver");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/solve", (req, res) => {
  const { board } = req.body;
  const copy = board.map(row => [...row]);

  const solvable = solveSudoku(copy);

  if (!solvable) {
    return res.json({ solvable: false });
  }

  res.json({
    solvable: true,
    solution: copy
  });
});

app.get("/", (req, res) => {
  res.send("Sudoku Solver API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
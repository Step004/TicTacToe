import SimpleGameObject from "./SimpleGameObject";

export default class Computer extends SimpleGameObject {
  constructor(icon) {
    super(icon);
    this.maxDepth = localStorage.getItem("selectedDifficulty");
  }

  step(board, checkWin, simpleGameObject, view) {
    this.checkWin = checkWin;
    this.simpleGameObject = simpleGameObject;
    const bestMove = this.minimax(board, 0, true);
    if (bestMove && bestMove.move) {
      const [px, py] = bestMove.move;
      board[px][py] = this.icon;
      view.occupationCell(px, py, this.icon);
    }
  }
  randomStep(count, board, view) {
    let i = Math.floor(Math.random() * count);
    let j = Math.floor(Math.random() * count);

    while (board[i][j] !== "") {
      i = Math.floor(Math.random() * count);
      j = Math.floor(Math.random() * count);
    }
    board[i][j] = this.icon;
    view.occupationCell(i, j, this.icon);
  }

  minimax(board, depth, isMaximizingPlayer) {
    if (this.checkWin(board, this)) {
      return { score: 10 - depth };
    } else if (this.checkWin(board, this.simpleGameObject)) {
      return { score: depth - 10 };
    } else if (this.isBoardFull(board)) {
      return { score: 0 };
    }

    if (depth >= this.maxDepth) {
      return { score: 0 };
    }

    const scores = [];
    const moves = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          const move = { move: [i, j] };
          board[i][j] = isMaximizingPlayer
            ? this.icon
            : this.simpleGameObject.icon;
          const result = this.minimax(board, depth + 1, !isMaximizingPlayer);
          const score = result.score;
          board[i][j] = "";
          move.score = score;
          scores.push(score);
          moves.push(move);
        }
      }
    }

    const bestMoveIndex = isMaximizingPlayer
      ? scores.indexOf(Math.max(...scores))
      : scores.indexOf(Math.min(...scores));
    const bestMove = moves[bestMoveIndex];

    return bestMove;
  }

  isBoardFull(board) {
    return board.every((row) => row.every((cell) => cell !== ""));
  }
}

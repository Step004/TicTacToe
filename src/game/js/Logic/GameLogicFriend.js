import View from "../View/ViewFriend";

export default class GameLogic {
  constructor(lengthBoard) {
    this.gameModel = [];
    this.lengthBoard = lengthBoard;
    this.players = {
      user1: "x",
      user2: "o",
    };
    this.currentPlayer = "user1";
    this.view = new View(this);
    this.view.renderTable(lengthBoard);
    this.createGameModel();
    this.view.highlightCurrentPlayer(this.currentPlayer);
  }

  clickOnCell(cell) {
    if (!cell.textContent) {
      const playerIcon = this.players[this.currentPlayer];
      this.occupationCell(cell, playerIcon);
      const [row, col] = [cell.parentElement.rowIndex, cell.cellIndex];
      this.gameModel[row][col] = playerIcon;

      if (this.checkGameState()) {
        return;
      }

      this.switchPlayer();
    }
  }

  occupationCell(cell, icon) {
    cell.innerText = icon;
    cell.classList.add(icon);
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "user1" ? "user2" : "user1";
    this.view.highlightCurrentPlayer(this.currentPlayer);
  }

  checkGameState() {
    const win = this.checkWin(this.gameModel, this.players[this.currentPlayer]);

    if (win) {
      const message =
        this.currentPlayer === "user1"
          ? "Гравець 1 виграв!"
          : "Гравець 2 виграв!";
      this.view.updateUiAfterEndParty(message, this.currentPlayer);
      return true;
    } else if (win === false) {
      this.view.updateUiAfterEndParty("Нічія");
      return true;
    }
    return false;
  }

  checkWin(gameModel, icon) {
    const count = gameModel.length;
    const targetCount = 5;
    // let flag = false;
    let countItems = 0;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        if (!gameModel[i][j]) countItems++;
      }
    }

    const checkLine = (cells) => cells.every((cell) => cell === icon);

    // Check rows
    for (let row = 0; row < count; row++) {
      for (let col = 0; col <= count - targetCount; col++) {
        if (checkLine(gameModel[row].slice(col, col + targetCount))) {
          return true;
        }
      }
    }

    // Check columns
    for (let col = 0; col < count; col++) {
      for (let row = 0; row <= count - targetCount; row++) {
        const column = [];
        for (let k = 0; k < targetCount; k++) {
          column.push(gameModel[row + k][col]);
        }
        if (checkLine(column)) {
          return true;
        }
      }
    }

    // Check diagonals
    for (let row = 0; row <= count - targetCount; row++) {
      for (let col = 0; col <= count - targetCount; col++) {
        const diagonal1 = [],
          diagonal2 = [];
        for (let k = 0; k < targetCount; k++) {
          diagonal1.push(gameModel[row + k][col + k]);
          diagonal2.push(gameModel[row + k][col + targetCount - 1 - k]);
        }
        if (checkLine(diagonal1) || checkLine(diagonal2)) {
          return true;
        }
      }
    }

    return countItems === 0 ? false : undefined;
  }

  createGameModel() {
    this.gameModel = Array.from({ length: this.lengthBoard }, () =>
      Array(this.lengthBoard).fill("")
    );
  }

  clearModel() {
    for (let i = 0; i < this.lengthBoard; i++) {
      for (let k = 0; k < this.lengthBoard; k++) {
        this.gameModel[i][k] = "";
      }
    }
  }
}

import Computer from "../Players/Computer.js";
import SimpleGameObject from "../Players/SimpleGameObject.js";
import View from "../View/View.js";

export default class GameLogic {
  constructor(lengthBoard) {
    this.gameModel = [];
    this.lengthBoard = lengthBoard;
    this.computer = new Computer("o");
    this.humanPlayer = new SimpleGameObject("x");
    this.view = new View(this);
    this.view.renderTable(lengthBoard);
    this.createGameModel();
  }

  clickOnCell(cell) {
    if (!cell.textContent) {
      this.humanPlayer.step(
        cell.parentElement.rowIndex,
        cell.cellIndex,
        this.view,
        this.gameModel
      );

      if (this.checkGameState(this.humanPlayer) !== undefined) {
        return;
      }

      this.computer.step(
        this.gameModel,
        this.checkWin.bind(this),
        this.humanPlayer,
        this.view
      );

      this.checkGameState(this.computer);
    }
  }

  checkGameState(gameobject) {
    var win = this.checkWin(this.gameModel, gameobject);

    if (win) {
      if (gameobject instanceof Computer) {
        this.view.updateUiAfterEndParty("Ви програли в партії", "warning");
        this.view.removeEvent();
        return true;
      }
      this.view.updateUiAfterEndParty("Ви виграли в партії", "success");
      this.view.removeEvent();
      return true;
    } else if (win === false) {
      this.view.updateUiAfterEndParty("Нічія");
      this.view.removeEvent();
      return false;
    }
  }

  checkWin(gameModel, player) {
    const count = gameModel.length;
    const targetCount = 5;
    let flag = false;
    let countItems = 0;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        if (!gameModel[i][j]) countItems++;
      }
    }

    if (countItems > 0) {
      for (let i = 0; i < count; i++) {
        for (let j = 0; j <= count - targetCount; j++) {
          let consecutiveCount = 0;
          for (let k = 0; k < targetCount; k++) {
            if (gameModel[i][j + k] === player.icon) {
              consecutiveCount++;
              if (consecutiveCount === targetCount) {
                flag = true;
                break;
              }
            } else {
              break;
            }
          }
          if (flag) break;
        }
        if (flag) break;
      }

      if (!flag) {
        for (let j = 0; j < count; j++) {
          for (let i = 0; i <= count - targetCount; i++) {
            let consecutiveCount = 0;
            for (let k = 0; k < targetCount; k++) {
              if (gameModel[i + k][j] === player.icon) {
                consecutiveCount++;
                if (consecutiveCount === targetCount) {
                  flag = true;
                  break;
                }
              } else {
                break;
              }
            }
            if (flag) break;
          }
          if (flag) break;
        }
      }

      if (!flag) {
        for (let i = 0; i <= count - targetCount; i++) {
          for (let j = 0; j <= count - targetCount; j++) {
            let consecutiveCount = 0;
            for (let k = 0; k < targetCount; k++) {
              if (gameModel[i + k][j + k] === player.icon) {
                consecutiveCount++;
                if (consecutiveCount === targetCount) {
                  flag = true;
                  break;
                }
              } else {
                break;
              }
            }
            if (flag) break;
          }
          if (flag) break;
        }
      }

      if (!flag) {
        for (let i = targetCount - 1; i < count; i++) {
          for (let j = 0; j <= count - targetCount; j++) {
            let consecutiveCount = 0;
            for (let k = 0; k < targetCount; k++) {
              if (gameModel[i - k][j + k] === player.icon) {
                consecutiveCount++;
                if (consecutiveCount === targetCount) {
                  flag = true;
                  break;
                }
              } else {
                break;
              }
            }
            if (flag) break;
          }
          if (flag) break;
        }
      }
    }

    if (flag) return true;
    if (countItems === 0) return false;
    return undefined;
  }

  createGameModel() {
    for (let i = 0; i < this.lengthBoard; i++) {
      this.gameModel[i] = new Array(this.lengthBoard + 1);
    }

    for (let i = 0; i < this.lengthBoard; i++) {
      for (let k = 0; k < this.lengthBoard; k++) {
        this.gameModel[i][k] = "";
      }
    }
  }

  clearModel() {
    for (let i = 0; i < this.lengthBoard; i++) {
      for (let k = 0; k < this.lengthBoard; k++) {
        this.gameModel[i][k] = "";
      }
    }
  }
}

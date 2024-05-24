import Swal from "sweetalert2";

export default class View {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
    this.board = document.getElementById("game__board");
    this.compCountHtml = document.getElementById("computerCount");
    this.playerCountHtml = document.getElementById("playerCount");
    this.currentPlayerElement = null;
  }

  highlightCurrentPlayer(playerId) {
    if (this.currentPlayerElement) {
      this.currentPlayerElement.classList.remove("highlight");
    }
    this.currentPlayerElement = document.getElementById(playerId);
    this.currentPlayerElement.classList.add("highlight");
  }

  updateUiAfterEndParty(message, currentPlayer) {
    if (currentPlayer === "user2") {
      this.playerCountHtml.innerText =
        Number(this.playerCountHtml.innerText) + 1;
    } else {
      this.compCountHtml.innerText = Number(this.compCountHtml.innerText) + 1;
    }
    Swal.fire({ title: message, icon: "success" });
    this.removeEvent();
    this.showBlock(".choosePlayer");
  }

  removeEvent() {
    const elements = this.board.getElementsByTagName("td");
    for (let element of elements) {
      element.onclick = null;
    }
  }

  restart(board) {
    const elements = board.getElementsByTagName("td");
    for (let element of elements) {
      element.innerHTML = "";
      element.classList.remove("x");
      element.classList.remove("o");
    }
    if (this.currentPlayerElement) {
      this.currentPlayerElement.classList.remove("highlight");
    }
    this.showBlock(".choosePlayer", "inlineBlock");
  }

  showBlock(selector, displayStyle = "block") {
    const element = document.querySelector(selector);
    if (element) {
      if (window.getComputedStyle(element).display === "none") {
        element.style.display = displayStyle;
      } else {
        element.style.display = "none";
      }
    }
  }

  renderTable(boardLength) {
    this.board.innerHTML = ""; // Очищуємо попередній вміст
    for (let j = 0; j < boardLength; j++) {
      const row = document.createElement("tr");
      for (let i = 0; i < boardLength; i++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      }
      this.board.appendChild(row);
    }
  }

  occupationCell(x, y, icon) {
    const cell = this.board.rows[x].cells[y];
    cell.innerText = icon;
    cell.classList.add(icon);
  }
}

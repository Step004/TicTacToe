import Swal from "sweetalert2";

export default class View {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;

    // Ініціалізація потрібних HTML елементів
    this.board = document.getElementById("game__board");
    this.compCountHtml = document.getElementById("computerCount");
    this.playerCountHtml = document.getElementById("playerCount");
    
  }

  // Оновлення UI в залежності від результату партії
  updateUiAfterEndParty(message, alert) {
    if (alert === "warning") {
      this.compCountHtml.innerText = Number(this.compCountHtml.innerText) + 1;
    }

    if (alert === "success") {
      this.playerCountHtml.innerText =
        Number(this.playerCountHtml.innerText) + 1;
    }

    Swal.fire({ title: message, icon: alert });
    this.removeEvent();
    this.showBlock(".choosePlayer");
  }

  // Видалення подій, повішених на клітинки ігрового поля
  removeEvent() {
    const elements = this.board.getElementsByTagName("td");
    for (let element of elements) {
      element.onclick = null;
    }
  }

  // Рестарт гри
  restart(board) {
    const elements = board.getElementsByTagName("td");
    for (let element of elements) {
      element.innerHTML = "";
      element.classList.remove("x");
      element.classList.remove("o");
    }
    this.showBlock(".choosePlayer", "inlineBlock");
  }

  // Зміна видимості блоку
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

  // Відображення таблиці відповідно до заданих розмірів
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

  // Зайняття клітинки ігрового поля
  occupationCell(x, y, icon) {
    const cell = this.board.rows[x].cells[y];
    cell.innerText = icon;
    cell.classList.add(icon);
  }
}

import Swal from "sweetalert2";
import $ from "jquery";


export default class View {
  constructor(gameLogic, handleDispatch) {
    this.gameLogic = gameLogic;
    this.handleDispatch = handleDispatch;

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

    Swal.fire({
      title: message,
      icon: alert,
      didClose: () => {
        console.log(this.handleDispatch());
      },
    });
    this.removeEvent();
  }

  // Видалення подій, повішених на клітинки ігрового поля
  removeEvent() {
    const articles = $("#game__board td");
    $(articles).off("click", this.clickHandler);
  }

  // Рестарт гри
  restart(board) {
    const elements = board.getElementsByTagName("td");
    for (let element of elements) {
      element.innerHTML = "";
      element.classList.remove("x");
      element.classList.remove("o");
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

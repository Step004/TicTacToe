import { useEffect, useRef } from "react";
import GameLogicFriend from "../../game/js/Logic/GameLogicFriend.js";
import ViewFriend from "../../game/js/View/ViewFriend.js";
import $ from "jquery";
import css from "./GamePageWithFriend.module.css";
import { FaUser } from "react-icons/fa";


export default function GamePageWithFriend() {
  const gameLogicRef = useRef(null);

  useEffect(() => {
    // Ініціалізуємо логіку гри після того, як компонент було змонтовано
    const view = new ViewFriend();
    gameLogicRef.current = new GameLogicFriend(7, view);

    newParty();

    // Встановлюємо обробник кліків на всі клітинки гри
    const articles = $("#game__board td");
    $(articles).click(function () {
      gameLogicRef.current.clickOnCell(this);
    });

    // Додаємо обробник для кнопки "Почати гру заново" після монтовання компонента
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
      newParty();
    });

    return () => {
      // Прибирання обробників подій при розмонтуванні компонента
      restartButton.removeEventListener("click", () => {
        newParty();
      });
    };
  }, []);

  // Запуск нової партії
  const newParty = () => {
    // Скидання UI гри на початок партії
    gameLogicRef.current.view.restart(document.getElementById("game__board"));
    gameLogicRef.current.clearModel();
    const articles = $("#game__board td");
    $(articles).click(function () {
      gameLogicRef.current.clickOnCell(this);
    });
  };

  return (
    <div className={css.gameCont}>
      <div className={css.scoreBoard}>
        <div className={css.leftBoard}>
          <div className={css.choosePlayer}>
            <h2 className={css.choosePlayer__title}>Хід гравця:</h2>
            <div id="players" className={css.choosePlayer__content}>
              <div className={css.choosePlayer__content__description}>
                <button
                  id="user1"
                  className={css.choosePlayer__content__description__text}
                >
                  <FaUser />
                  Гравець 1
                </button>
              </div>
              <div className={css.choosePlayer__content__description}>
                <button
                  id="user2"
                  className={css.choosePlayer__content__description__text}
                >
                  Гравець 2
                  <FaUser />
                </button>
              </div>
            </div>
          </div>
          <div className={css.gameScore}>
            <div className={css.gameScore__content}>
              <h2 className={css.gameScore__title}>Рахунок</h2>
              <p className={css.gameScore__player}>
                Гравець 1: <span id="computerCount">0 </span>
              </p>
              <p className={css.gameScore__player}>
                Гравець 2: <span id="playerCount">0</span>
              </p>
            </div>
          </div>
          <button id="restartButton" className={css.restartButton}>
            Почати гру заново
          </button>
        </div>

        <div className={css.game}>
          <table id="game__board">
            {/* Створення клітинок гри */}
            <tbody>
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(3)].map((_, colIndex) => (
                    <td key={colIndex}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

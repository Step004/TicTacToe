import { useEffect, useRef, useState } from "react";
import GameLogic from "../../game/js/Logic/GameLogic.js";
import View from "../../game/js/View/View.js";
import $ from "jquery";
import css from "./GamePage.module.css";
import { FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateGameInfo } from "../../redux/contacts/operations.js";
import { selectInfoAboutUser } from "../../redux/contacts/selectors.js";

export default function GamePage() {
  const gameLogicRef = useRef(null);
  const user = useSelector((state) => state.auth);
  const info = useSelector(selectInfoAboutUser);
  const [initialPlayerCount, setInitialPlayerCount] = useState(0);
  const [initialComputerCount, setInitialComputerCount] = useState(0);

  const dispatch = useDispatch();

  const handleDispatch = () => {
    const computerCount = Number(
      document.querySelector("#computerCount").innerHTML
    );
    let playerCount = Number(document.querySelector("#playerCount").innerHTML);

    const playerCountDifference = playerCount - initialPlayerCount;
    const computerCountDifference = computerCount - initialComputerCount;

    const updatedInfo = {
      username: user.username,
      time: info.time,
      victory: info.victory + playerCountDifference,
      allGames: info.allGames + playerCountDifference + computerCountDifference,
    };
    dispatch(updateGameInfo(updatedInfo));
    setInitialPlayerCount(playerCount);
    setInitialComputerCount(computerCount);
  };

  useEffect(() => {
    // Ініціалізуємо логіку гри після того, як компонент було змонтовано
    const view = new View();
    gameLogicRef.current = new GameLogic(7, handleDispatch, view);

    newParty();

    $(document).ready(() => {
      $("#user").click(() => {
        newParty();
      });

      $("#computer").click(() => {
        newParty();
        gameLogicRef.current.computer.randomStep(
          7,
          gameLogicRef.current.gameModel,
          gameLogicRef.current.view
        );
      });
    });

    ////////////////////////////////////////
    const playerCount = Number(
      document.querySelector("#playerCount").innerHTML
    );
    const computerCount = Number(
      document.querySelector("#computerCount").innerHTML
    );
    setInitialComputerCount(computerCount);
    setInitialPlayerCount(playerCount);
    /////////////////////////////////////////

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
            <h2 className={css.choosePlayer__title}>
              Виберіть, хто буде ходить першим
            </h2>
            <div id="players" className={css.choosePlayer__content}>
              <div className={css.choosePlayer__content__description}>
                <button
                  id="user"
                  className={css.choosePlayer__content__description__text}
                  onClick={handleDispatch}
                >
                  <FaUser />
                  Ви
                </button>
              </div>
              <div className={css.choosePlayer__content__description}>
                <button
                  id="computer"
                  className={css.choosePlayer__content__description__text}
                  onClick={handleDispatch}
                >
                  Комп`ютер
                  <FaRobot />
                </button>
              </div>
            </div>
          </div>
          <div className={css.gameScore}>
            <div className={css.gameScore__content}>
              <h2 className={css.gameScore__title}>Рахунок</h2>
              <p className={css.gameScore__player}>
                Комп`ютер: <span id="computerCount">0 </span>
              </p>
              <p className={css.gameScore__player}>
                Ви: <span id="playerCount">0</span>
              </p>
            </div>
          </div>
          <button
            id="restartButton"
            className={css.restartButton}
            onClick={handleDispatch}
          >
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

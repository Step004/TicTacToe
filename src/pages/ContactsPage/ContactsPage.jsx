import { useDispatch, useSelector } from "react-redux";
import css from "./ContactsPage.module.css";
import userPhoto from "../../image/user.png";
import gamePhoto from "../../image/game.png";
import { useEffect, useState } from "react";
import RadioDif from "../../components/RadioDif/RadioDif";
import { NavLink } from "react-router-dom";
import { getGameInfo } from "../../redux/contacts/operations";
import { selectInfoAboutUser } from "../../redux/contacts/selectors";

export default function ContactsPage() {
  const user = useSelector((state) => state.auth);
  const [showDif, setShowDif] = useState(false);
  const [selectedOption, setSelectedOption] = useState("computer");
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const info = useSelector(selectInfoAboutUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameInfo(user.username));
  }, [user.username, dispatch]);

  const handleDifficultyChange = (value) => {
    const difficulty = Number(value);
    setSelectedDifficulty(difficulty);
  };
  localStorage.setItem("selectedDifficulty", selectedDifficulty);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClick = () => {
    setShowDif(true);
  };

  return (
    <div className={css.aboutUser}>
      <div className={css.upPart}>
        <div>
          <h1>{user.username}</h1>
          <img src={userPhoto} alt="userPhoto" />
        </div>
        <img src={gamePhoto} alt="gameField" width={350} height={350} />
        <div className={css.statistic}>
          <p className={css.allGame}>Зіграних ігор: {info.allGames}</p>
          <p className={css.rating}>Кількість перемог: {info.victory}</p>
          <p className={css.rating}>Час проведений у грі: {info.time} хв.</p>
        </div>
      </div>

      <h2 className={css.textChoose}>Вибери суперника</h2>
      <div className={css.typeSelectors}>
        <select name="typeGame" onChange={handleChange} defaultValue="computer">
          <option value="computer">Грати з комп`ютером</option>
          <option value="friend">Грати з другом</option>
        </select>
      </div>
      {selectedOption === "computer" && (
        <button className={css.buttonDif} onClick={handleClick}>
          Складність
        </button>
      )}
      {showDif && <RadioDif onChange={handleDifficultyChange} />}
      {selectedOption === "computer" ? (
        <NavLink to="/game">
          <button className={css.buttonPlay}>
            <span></span>Грати
          </button>
        </NavLink>
      ) : (
        <NavLink to="/gameFriend">
          <button className={css.buttonPlay}>
            <span></span>Грати
          </button>
        </NavLink>
      )}
    </div>
  );
}

import { useSelector } from "react-redux";
import css from "./ContactsPage.module.css";
import userPhoto from "../../image/user.png";
import gamePhoto from "../../image/game.png";
import { useState} from "react";
import RadioDif from "../../components/RadioDif/RadioDif";
import { NavLink } from "react-router-dom";

export default function ContactsPage() {
  const user = useSelector((state) => state.auth);
  const [showDif, setShowDif] = useState(false);
  const [selectedOption, setSelectedOption] = useState("computer");
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);



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
          <p className={css.allGame}>All games: 258</p>
          <p className={css.rating}>Your rating: 65%</p>
          <p className={css.rating}>Time in game: 25 hours</p>
        </div>
      </div>

      <h2 className={css.textChoose}>Choose type game</h2>
      <div className={css.typeSelectors}>
        <select name="typeGame" onChange={handleChange} defaultValue="computer">
          <option value="computer">Playing with computer.</option>
          <option value="friend">Playing with friend.</option>
        </select>
      </div>
      {selectedOption === "computer" && (
        <button className={css.buttonDif} onClick={handleClick}>
          Difficulty
        </button>
      )}
      {showDif && <RadioDif onChange={handleDifficultyChange} />}

      <button className={css.buttonPlay}>
        <span></span>
        <NavLink to="/game">Play</NavLink>
      </button>
    </div>
  );
}

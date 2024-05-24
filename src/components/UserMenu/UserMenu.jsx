import { useDispatch, useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { updateGameInfo } from "../../redux/contacts/operations";
import { selectInfoAboutUser } from "../../redux/contacts/selectors";

export default function UserMenu({ firstTime }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const info = useSelector(selectInfoAboutUser);

  const handleLogout = () => {
    const lastTime = Date.now();
    const time = Math.round(lastTime - firstTime) / 1000;
    const timeAround = info.time + time/60;
    const updatedInfo = {
      username: user.username,
      time: timeAround,
      victory: info.victory,
      allGames: info.allGames,
    };
    // const updatedInfo = {
    //   username: user.username,
    //   time: 0,
    //   victory: info.victory,
    //   allGames: info.allGames,
    // };
    dispatch(updateGameInfo(updatedInfo));
    dispatch(logOut());
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.username}!</p>

      <button className={css.button } onClick={handleLogout}>
        <p>Logout!</p>
      </button>
    </div>
  );
}

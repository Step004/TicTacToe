import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true;

  return (
    <nav>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={buildLinkClass}>
          Contacts
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/game" className={buildLinkClass}>
          Game
        </NavLink>
      )}
    </nav>
  );
}

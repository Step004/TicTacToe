import { NavLink } from "react-router-dom";
import css from './AuthNav.module.css';
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function AuthNav() {
    return (
      <nav>
        <NavLink to="/register" className={buildLinkClass}>
          Registration
        </NavLink>
        <NavLink to="/login" className={buildLinkClass}>
          Login
        </NavLink>
      </nav>
    );
}
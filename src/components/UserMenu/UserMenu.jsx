import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';

export default function UserMenu() {
const dispatch = useDispatch();
const user = useSelector(selectUser);

const handleLogout = () => {
  dispatch(logOut());
};


  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

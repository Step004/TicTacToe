import AppBar from '../AppBar/AppBar';
import css from './Layout.module.css';
import { Toaster } from 'react-hot-toast';


export default function Layout({ children, firstTime }) {
  return (
    <div className={css.container}>
          <AppBar firstTime={firstTime} />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
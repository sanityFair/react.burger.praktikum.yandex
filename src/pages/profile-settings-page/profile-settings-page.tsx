import { Navigate, Outlet } from 'react-router';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useLogoutMutation } from '@/services';

export const ProfileSettingsPage = () => {
  const [logout, { isSuccess, data }] = useLogoutMutation();

  const handleClick = () => logout();

  if (isSuccess && data.success) return <Navigate to='/login' replace />;

  return (
    <div className={styles.root}>
      <nav className={styles.menu}>
        <NavLink
          to=''
          end
          className={({ isActive }) =>
            classNames('text text_type_main-medium', {
              text_color_inactive: !isActive,
              [styles.active]: isActive,
            })
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to='orders'
          className={({ isActive }) => {
            return classNames('text text_type_main-medium', {
              text_color_inactive: !isActive,
              [styles.active]: isActive,
            });
          }}
        >
          История заказов
        </NavLink>
        <NavLink
          to='#'
          onClick={handleClick}
          className={classNames('text text_type_main-medium', {
            text_color_inactive: true,
          })}
        >
          Выход
        </NavLink>
        <p className='text text_type_main-default text_color_inactive pt-10'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

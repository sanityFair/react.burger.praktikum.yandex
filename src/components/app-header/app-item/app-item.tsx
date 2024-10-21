import classNames from 'classnames';
import appItemStyles from './app-item.module.css';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

type Props = {
  icon: 'burger' | 'list' | 'profile' | '';
  title: string;
  to: string;
};

export const AppItem = ({ title, icon = '', to }: Props) => (
  <NavLink
    className={({ isActive }) =>
      classNames(
        appItemStyles.root,
        {
          [appItemStyles.inactive]: !isActive,
        },
        'text text_type_main-default'
      )
    }
    to={to}
  >
    {({ isActive }) => (
      <>
        {icon === 'burger' && (
          <BurgerIcon type={isActive ? 'primary' : 'primary'} />
        )}
        {icon === 'list' && (
          <ListIcon type={isActive ? 'primary' : 'primary'} />
        )}
        {icon === 'profile' && (
          <ProfileIcon type={isActive ? 'primary' : 'primary'} />
        )}
        {title}
      </>
    )}
  </NavLink>
);

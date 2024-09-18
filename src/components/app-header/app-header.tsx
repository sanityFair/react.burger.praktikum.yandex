import {
  BurgerIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { AppItem } from "./app-item";

export const AppHeader = () => {
  return (
    <div className={appHeaderStyles.root}>
      <div className={appHeaderStyles.container}>
        <AppItem title="Конструктор" icon="burger" active/>
        <AppItem title="Лента заказов" icon="list" />
        <Logo className={appHeaderStyles.logo} />
        <AppItem title="Личный кабинет" icon="profile" />
      </div>
    </div>
  );
};

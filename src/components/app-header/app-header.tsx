import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { AppItem } from "./app-item";

import appHeaderStyles from "./app-header.module.css";

export const AppHeader = () => (
  <header className={appHeaderStyles.root}>
    <nav className={appHeaderStyles.container}>
      <AppItem title="Конструктор" icon="burger" active />
      <AppItem title="Лента заказов" icon="list" />
      <Logo className={appHeaderStyles.logo} />
      <AppItem title="Личный кабинет" icon="profile" />
    </nav>
  </header>
);

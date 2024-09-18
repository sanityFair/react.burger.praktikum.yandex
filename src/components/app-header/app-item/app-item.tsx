import classNames from "classnames";
import appItemStyles from "./app-item.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  icon: "burger" | "list" | "profile" | "";
  title: string;
  active?: boolean;
};

export const AppItem = ({ title, icon = "", active = false }: Props) => {
  return (
    <a
      className={classNames(
        appItemStyles.root,
        {
          [appItemStyles.inactive]: !active,
        },
        "text text_type_main-default"
      )}
      href="#"
    >
      {icon === "burger" && (
        <BurgerIcon type={active ? "primary" : "primary"} />
      )}
      {icon === "list" && <ListIcon type={active ? "primary" : "primary"} />}
      {icon === "profile" && (
        <ProfileIcon type={active ? "primary" : "primary"} />
      )}
      {title}
    </a>
  );
};

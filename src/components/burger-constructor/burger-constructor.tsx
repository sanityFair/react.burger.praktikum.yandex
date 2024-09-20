import { MOCK } from "@/constants";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructorStyles from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  return (
    <section className={burgerConstructorStyles.root.concat(" mt-20")}>
      {MOCK.map((item, index) => (
        <div className={burgerConstructorStyles.item}>
          {(index !== 0 && index !== MOCK.length - 1) && (
            <DragIcon type="primary" />
          )}
          <ConstructorElement
            type={
              index === 0
                ? "top"
                : index === MOCK.length - 1
                ? "bottom"
                : undefined
            }
            isLocked={
              index === 0 ? true : index === MOCK.length - 1 ? true : false
            }
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            key={item._id}
          />
        </div>
      ))}
    </section>
  );
};

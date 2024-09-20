import { MOCK } from "@/constants";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructorStyles from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  return (
    <section className="mt-20">
      <div className={burgerConstructorStyles.root.concat(" mb-10")}>
        {MOCK.map((item, index) => (
          <div className={burgerConstructorStyles.item}>
            {index !== 0 && index !== MOCK.length - 1 && (
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
      </div>
      <div className={burgerConstructorStyles.order}>
        <span className="text text_type_digits-medium ">
          624 <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-4">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

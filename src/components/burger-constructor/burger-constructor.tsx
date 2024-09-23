import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructorStyles from "./burger-constructor.module.css";
import { IngredientProps } from "../burger-ingredients";
import { OrderDetails } from "../order-details";
import { useBoolean } from "@/hooks";

export const BurgerConstructor = ({ ingredients }: IngredientProps) => {
  const [isOpen, { off, on }] = useBoolean(false);
  return (
    <section className="mt-20">
      <div className={burgerConstructorStyles.root.concat(" mb-10")}>
        {ingredients.map((item, index) => (
          <div className={burgerConstructorStyles.item}>
            {index !== 0 && index !== ingredients.length - 1 && (
              <DragIcon type="primary" />
            )}
            <ConstructorElement
              type={
                index === 0
                  ? "top"
                  : index === ingredients.length - 1
                  ? "bottom"
                  : undefined
              }
              isLocked={
                index === 0
                  ? true
                  : index === ingredients.length - 1
                  ? true
                  : false
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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-4"
          onClick={on}
        >
          Оформить заказ
        </Button>
      </div>
      <OrderDetails isOpen={isOpen} onClose={off} orderId="034536" />
    </section>
  );
};

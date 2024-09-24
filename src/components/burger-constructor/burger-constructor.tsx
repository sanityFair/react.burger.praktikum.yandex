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
import { Modal } from "../modal";
import { useMemo } from "react";

export const BurgerConstructor = ({ ingredients }: IngredientProps) => {
  const [isOpen, { off, on }] = useBoolean(false);
  const bun = useMemo(
    () => ingredients.find((item) => item.type === "bun"),
    [ingredients]
  );

  const bunTop = bun && (
    <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name.concat(" (верх)")}
        price={bun.price}
        thumbnail={bun.image}
        key={`${bun._id}-top`}
      />
      <div className={burgerConstructorStyles.spacer} />
    </>
  );

  const bunBottom = bun && (
    <>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name.concat(" (низ)")}
        price={bun.price}
        thumbnail={bun.image}
        key={`${bun._id}-top`}
      />
      <div className={burgerConstructorStyles.spacer} />
    </>
  );

  return (
    <section className={burgerConstructorStyles.root}>
      <div className={burgerConstructorStyles.item}>{bunTop}</div>
      <div className={burgerConstructorStyles.content}>
        {ingredients
          .filter((item) => item.type !== "bun")
          .map((item) => (
            <div className={burgerConstructorStyles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={item._id}
              />
            </div>
          ))}
      </div>
      <div className={burgerConstructorStyles.item}>{bunBottom}</div>
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
        <div className={burgerConstructorStyles.spacer} />
      </div>
      <Modal isOpen={isOpen} onClose={off}>
        <OrderDetails orderId="034536" />
      </Modal>
    </section>
  );
};

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyles from "./burger-ingredient.module.css";
import { Ingredient } from "@/types";
import { memo } from "react";

type Props = Partial<Ingredient> & {
  onClick?: (ingredient: Partial<Ingredient>) => void;
};

export const BurgerIngredient = memo(({ onClick, ...props }: Props) => (
  <div className={burgerIngredientStyles.root} onClick={() => onClick?.(props)}>
    <div className={burgerIngredientStyles.imageContainer}>
      <img src={props.image} alt={props.name} width="100%" />
      <Counter count={1} size="default" />
    </div>
    <span
      className={burgerIngredientStyles.price.concat(
        " text text_type_main-small"
      )}
    >
      {props.price} <CurrencyIcon type="primary" />
    </span>
    <p className="text text_type_main-small">{props.name}</p>
  </div>
));

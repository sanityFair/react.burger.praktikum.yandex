import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyles from "./burger-ingredient.module.css";

type Props = {
  image: string;
  name: string;
  price: number;
};

export const BurgerIngredient = ({ image, name, price }: Props) => {
  return (
    <div className={burgerIngredientStyles.root}>
      <div className={burgerIngredientStyles.imageContainer}>
        <img src={image} alt={name} width="100%" />
        <Counter count={1} size="default" />
      </div>
      <span
        className={burgerIngredientStyles.price.concat(
          " text text_type_main-small"
        )}
      >
        {price} <CurrencyIcon type="primary" />
      </span>
      <p className="text text_type_main-small">{name}</p>
    </div>
  );
};

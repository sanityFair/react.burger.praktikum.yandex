import { Ingredient } from "@/types";
import { BurgerIngredient } from "../burger-ingredient";

import bunListStyles from "./ingredient-list.module.css";

type Props = {
  items: Pick<Ingredient, "_id" | "image" | "name" | "price">[];
  title: string;
};

export const IngredientList = ({ items, title }: Props) => (
  <div className={bunListStyles.root}>
    <h6 className="text text_type_main-medium">{title}</h6>
    <div className={bunListStyles.items}>
      {items?.map((item) => (
        <BurgerIngredient
          name={item.name}
          image={item.image}
          price={item.price}
          key={item._id}
        />
      ))}
    </div>
  </div>
);

import { Ingredient } from "@/types";
import { Item } from "./item";

import ingredientDetailsStyles from "./ingredient-details.module.css";

type Props = Pick<
  Partial<Ingredient>,
  "calories" | "proteins" | "fat" | "carbohydrates" | "name" | "image_large"
>;

export const IngredientDetails = ({
  name,
  calories,
  carbohydrates,
  proteins,
  fat,
  image_large,
}: Props) => (
  <div className={ingredientDetailsStyles.root}>
    <div>
      <img src={image_large} alt={name} width="100%" />
    </div>
    <p className="text text_type_main-medium">{name}</p>
    <div className={ingredientDetailsStyles.composition}>
      <Item name="Калории,ккал" value={calories} />
      <Item name="Белки, г" value={proteins} />
      <Item name="Жиры, г" value={fat} />
      <Item name="Углеводы, г" value={carbohydrates} />
    </div>
  </div>
);

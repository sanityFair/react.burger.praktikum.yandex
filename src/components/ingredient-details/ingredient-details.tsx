import { Ingredient } from "@/types";
import { Modal, ModalProps } from "../modal";
import { Item } from "./item";

import ingredientDetailsStyles from "./ingredient-details.module.css";

type Props = Pick<ModalProps, "isOpen" | "onClose"> &
  Pick<
    Ingredient,
    "calories" | "proteins" | "fat" | "carbohydrates" | "name" | "image_large"
  >;

export const IngredientDetails = ({ isOpen, onClose, ...props }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Детали ингредиента">
    <div className={ingredientDetailsStyles.root}>
      <div>
        <img src={props.image_large} alt={props.name} width="100%" />
      </div>
      <p className="text text_type_main-medium">{props.name}</p>
      <div className={ingredientDetailsStyles.composition}>
        <Item name="Калории,ккал" value={props.calories} />
        <Item name="Белки, г" value={props.proteins} />
        <Item name="Жиры, г" value={props.fat} />
        <Item name="Углеводы, г" value={props.carbohydrates} />
      </div>
    </div>
  </Modal>
);

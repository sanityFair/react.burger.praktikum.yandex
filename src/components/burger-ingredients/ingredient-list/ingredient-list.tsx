import { Ingredient } from "@/types";
import { BurgerIngredient } from "../burger-ingredient";

import bunListStyles from "./ingredient-list.module.css";
import { IngredientDetails } from "@/components/ingredient-details";
import { forwardRef, useMemo } from "react";
import { Modal } from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  currentIngredientSlice,
  selectCurrentIngredient,
  selectIngredients,
} from "@/services";
import isEqual from "lodash.isequal";

type Props = {
  type: "bun" | "sauce" | "main";
  title: string;
};

export const IngredientList = forwardRef<HTMLDivElement, Props>(
  ({ type, title }, ref) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(selectIngredients, isEqual);
    const items = useMemo(
      () => ingredients.filter((item) => item.type === type),
      [ingredients]
    );
    const currentIngredient = useSelector(selectCurrentIngredient, isEqual);

    const handleClose = () =>
      dispatch(currentIngredientSlice.actions.resetIngredient());

    return (
      <>
        <div className={bunListStyles.root} ref={ref}>
          <h6 className="text text_type_main-medium">{title}</h6>
          <div className={bunListStyles.items}>
            {items.map((item) => (
              <BurgerIngredient {...item} key={`${item._id}-${item.name}`} />
            ))}
          </div>
        </div>
        <Modal
          isOpen={Object.keys(currentIngredient).length !== 0}
          onClose={handleClose}
          title="Детали ингредиента"
        >
          <IngredientDetails {...currentIngredient} />
        </Modal>
      </>
    );
  }
);

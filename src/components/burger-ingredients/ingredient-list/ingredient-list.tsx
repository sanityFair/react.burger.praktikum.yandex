import { Ingredient } from "@/types";
import { BurgerIngredient } from "../burger-ingredient";

import bunListStyles from "./ingredient-list.module.css";
import { IngredientDetails } from "@/components/ingredient-details";
import { useBoolean } from "@/hooks";
import { useCallback, useState } from "react";
import { Modal } from "@/components/modal";

type Props = {
  items: Ingredient[];
  title: string;
};

export const IngredientList = ({ items, title }: Props) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Partial<Ingredient> | null>(null);
  const [isOpen, { off, on }] = useBoolean(false);

  const handleSelectIngredient = useCallback(
    (ingredient: Partial<Ingredient>) => {
      setSelectedIngredient(ingredient);
      on();
    },
    []
  );

  return (
    <div className={bunListStyles.root}>
      <h6 className="text text_type_main-medium">{title}</h6>
      <div className={bunListStyles.items}>
        {items?.map((item) => (
          <BurgerIngredient
            {...item}
            key={`${item._id}-${item.name}`}
            onClick={handleSelectIngredient}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={off} title="Детали ингредиента">
        <IngredientDetails {...selectedIngredient} />
      </Modal>
    </div>
  );
};

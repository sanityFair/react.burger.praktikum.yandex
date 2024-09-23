import { useState } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientList } from "./ingredient-list";
import { Modal } from "@/components/modal";
import { Ingredient } from "@/types";

export type IngredientProps = {
  ingredients: Ingredient[];
};

export const BurgerIngredients = ({ ingredients }: IngredientProps) => {
  const [current, setCurrent] = useState("bun");

  return (
    <section>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.content}>
        <IngredientList
          items={ingredients.filter((item) => item.type === "bun")}
          title="Булки"
        />
        <IngredientList
          items={ingredients.filter((item) => item.type === "sauce")}
          title="Соусы"
        />
        <IngredientList
          items={ingredients.filter((item) => item.type === "main")}
          title="Начинки"
        />
      </div>
    </section>
  );
};

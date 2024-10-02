import {
  ErrorBoundary,
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
} from "@/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import appStyles from "./app.module.css";

import { useGetIngredientsQuery } from "@/services";
import { Loader } from "../loader";

export const App = () => {
  const { isFetching } = useGetIngredientsQuery();

  if (isFetching)
    return (
      <div className={appStyles.loaderContainer}>
        <Loader />
      </div>
    );

  return (
    <ErrorBoundary fallback="Произошла ошибка.">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </ErrorBoundary>
  );
};

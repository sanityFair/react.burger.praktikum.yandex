import {
  ErrorBoundary,
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
} from "@/components";

import appStyles from "./app.module.css";
import { IngredientResponse } from "@/types";
import { useFetch } from "@/hooks";
import { config } from "@/constants";

export const App = () => {
  const { data, isLoading } = useFetch<IngredientResponse>({
    url: config.ingredients,
  });

  if (isLoading || !data?.data) return <h1>...Загрузка</h1>;

  return (
    <ErrorBoundary fallback="Произошла ошибка.">
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={data.data} />
        <BurgerConstructor ingredients={data.data} />
      </main>
    </ErrorBoundary>
  );
};

import {
  ErrorBoundary,
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
} from "@/components";

import appStyles from "./app.module.css";

export const App = () => (
  <ErrorBoundary fallback="">
    <AppHeader />
    <main className={appStyles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </ErrorBoundary>
);

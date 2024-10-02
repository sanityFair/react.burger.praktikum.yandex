import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  apiSlice,
  collectedIngredientsSlice,
  currentIngredientSlice,
  currentBurgerComponentsSlice,
} from "./services";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [collectedIngredientsSlice.reducerPath]: collectedIngredientsSlice.reducer,
    [currentIngredientSlice.reducerPath]: currentIngredientSlice.reducer,
    [currentBurgerComponentsSlice.reducerPath]:
      currentBurgerComponentsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type ApplicationState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

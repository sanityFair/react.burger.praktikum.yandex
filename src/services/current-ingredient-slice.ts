import { ApplicationState } from "@/store";
import { Ingredient } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Partial<Ingredient> = {};

export const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    selectIngredient: (_state, { payload }) => payload,
    resetIngredient: () => initialState,
  },
});

export const selectCurrentIngredient = (state: ApplicationState) =>
  state.currentIngredient;

export type CurrentIngredientState = typeof initialState;

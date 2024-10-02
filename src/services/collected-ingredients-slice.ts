import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api-slice";
import { Ingredient } from "@/types";
import { ApplicationState } from "@/store";

const initialState: Ingredient[] = [];

export const collectedIngredientsSlice = createSlice({
  name: "collectedIngredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getIngredients.matchFulfilled,
      (_, { payload }) => payload.data
    );
  },
});

export const selectIngredients = (state: ApplicationState) =>
  state.collectedIngredients;

export type CollectedIngredientsState = typeof initialState;

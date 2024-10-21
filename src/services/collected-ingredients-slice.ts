import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './api-slice';
import { Ingredient } from '@/types';
import { ApplicationState } from '@/store';

export type CollectedIngredientsState = {
  isLoading: boolean;
  ingredients: Ingredient[];
  error?: Record<string, unknown>;
};

const initialState: CollectedIngredientsState = {
  isLoading: false,
  ingredients: [],
};

export const collectedIngredientsSlice = createSlice({
  name: 'collectedIngredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getIngredients.matchPending,
      (state) => ({
        ...state,
        isLoading: true,
      })
    );
    builder.addMatcher(
      apiSlice.endpoints.getIngredients.matchRejected,
      (state, { payload }) => ({
        ...state,
        error: payload,
        isLoading: false,
      })
    );
    builder.addMatcher(
      apiSlice.endpoints.getIngredients.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        ingredients: [...payload.data],
        isLoading: false,
      })
    );
  },
});

export const selectIngredients = (state: ApplicationState) =>
  state.collectedIngredients.ingredients;

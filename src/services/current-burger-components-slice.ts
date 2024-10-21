import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { apiSlice } from './api-slice';
import { Ingredient } from '@/types';
import { ApplicationState } from '@/store';

export type CurrentBurgerComponentsState = {
  bun?: Ingredient;
  ingredients: Ingredient[];
  orderIds: string[];
};

const initialState: CurrentBurgerComponentsState = {
  ingredients: [],
  orderIds: [],
};

export const currentBurgerComponentsSlice = createSlice({
  name: 'currentBurgerComponents',
  initialState,
  reducers: {
    addIngredient(state, { payload }: PayloadAction<Ingredient>) {
      const orderIds = [...state.orderIds];

      if (payload.type === 'bun' && state.bun?._id !== payload._id) {
        const index = orderIds.findIndex((id) => id === state.bun?._id);

        orderIds.splice(index, 1, payload._id);
      }

      if (payload.type === 'bun') {
        return {
          ...state,
          bun: { ...payload, key: crypto.randomUUID() },
          orderIds,
        };
      }

      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...payload, key: crypto.randomUUID() },
        ],
        orderIds: [...orderIds, payload._id],
      };
    },
    removeIngredient(state, { payload: index }: PayloadAction<number>) {
      const ingredients = [...state.ingredients];
      const orderIds = [...state.orderIds];

      const [removedIngredient] = ingredients.splice(index, 1);
      const currentIndex = orderIds.findIndex(
        (id) => id === removedIngredient._id
      );

      if (currentIndex !== -1) orderIds.splice(currentIndex, 1);

      return {
        ...state,
        ingredients,
        orderIds,
      };
    },
    moveIngredient(
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = payload;
      const ingredients = [...current(state).ingredients];

      const [removedTo] = ingredients.splice(to, 1, {
        ...ingredients[from],
      });

      ingredients.splice(from, 1, { ...removedTo });

      return { ...state, ingredients };
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getIngredients.matchFulfilled,
      (state, { payload }) => {
        const bun = payload.data.find(({ type }) => type === 'bun');
        const orderIds = bun?._id ? [bun._id] : [];

        return {
          ...state,
          bun,
          orderIds,
        };
      }
    );
  },
});

export const selectCurrentBurgerBun = (state: ApplicationState) =>
  state.currentBurgerComponents.bun;

export const selectCurrentBurgerIngredients = (state: ApplicationState) =>
  state.currentBurgerComponents.ingredients;

export const selectIdsCurrentBurgerIngredients = (state: ApplicationState) =>
  state.currentBurgerComponents.orderIds;

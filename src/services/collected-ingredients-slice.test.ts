import {
  collectedIngredientsSlice,
  selectIngredients,
} from './collected-ingredients-slice';
import { Ingredient } from '@/types';

describe('collectedIngredientsSlice', () => {
  const initialState = {
    isLoading: false,
    ingredients: [],
    error: undefined,
  };

  const mockIngredients: Ingredient[] = [
    {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 150,
      price: 50,
      image: 'image-bun.jpg',
      image_mobile: 'image-bun-mobile.jpg',
      image_large: 'image-bun-large.jpg',
      __v: 0,
    },
  ];

  it('should handle initial state', () => {
    const state = collectedIngredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle getIngredients.pending', () => {
    const action = {
      type: 'apiSlice/executeQuery/pending',
      meta: {
        arg: {
          type: 'query',
          endpointName: 'getIngredients',
          queryCacheKey: 'getIngredients(undefined)',
        },
        requestStatus: 'pending',
      },
    };

    const state = collectedIngredientsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle getIngredients.fulfilled', () => {
    const action = {
      type: 'apiSlice/executeQuery/fulfilled',
      payload: {
        success: true,
        data: mockIngredients,
      },
      meta: {
        arg: {
          type: 'query',
          endpointName: 'getIngredients',
          queryCacheKey: 'getIngredients(undefined)',
        },
        requestStatus: 'fulfilled',
      },
    };

    const state = collectedIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: mockIngredients,
    });
  });

  it('should select ingredients from state', () => {
    const mockState = {
      collectedIngredients: {
        ...initialState,
        ingredients: mockIngredients,
      },
    };
    expect(selectIngredients(mockState as any)).toEqual(mockIngredients);
  });
});

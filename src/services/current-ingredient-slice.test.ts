import {
  currentIngredientSlice,
  selectCurrentIngredient,
} from './current-ingredient-slice';
import { Ingredient } from '@/types';

describe('currentIngredientSlice', () => {
  const initialState: Partial<Ingredient> = {};

  const mockIngredient: Ingredient = {
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
  };

  it('should handle initial state', () => {
    const state = currentIngredientSlice.reducer(undefined, {
      type: '',
    });
    expect(state).toEqual(initialState);
  });

  it('should handle selectIngredient', () => {
    const action =
      currentIngredientSlice.actions.selectIngredient(mockIngredient);
    const state = currentIngredientSlice.reducer(initialState, action);
    expect(state).toEqual(mockIngredient);
  });

  it('should handle resetIngredient', () => {
    const intermediateState = mockIngredient;
    const action = currentIngredientSlice.actions.resetIngredient();
    const state = currentIngredientSlice.reducer(intermediateState, action);
    expect(state).toEqual(initialState);
  });

  it('should select current ingredient from state', () => {
    const mockState = {
      currentIngredient: mockIngredient,
    };
    expect(selectCurrentIngredient(mockState as any)).toEqual(mockIngredient);
  });
});

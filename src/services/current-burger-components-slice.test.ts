import { currentBurgerComponentsSlice } from './current-burger-components-slice';
import { Ingredient } from '@/types';

describe('currentBurgerComponentsSlice', () => {
  const initialState = {
    bun: undefined,
    ingredients: [],
    orderIds: [],
  };

  const mockBun: Ingredient = {
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

  const mockIngredient: Ingredient = {
    _id: '2',
    name: 'Lettuce',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 2,
    calories: 10,
    price: 5,
    image: 'image-lettuce.jpg',
    image_mobile: 'image-lettuce-mobile.jpg',
    image_large: 'image-lettuce-large.jpg',
    __v: 0,
  };

  it('should handle initial state', () => {
    expect(
      currentBurgerComponentsSlice.reducer(undefined, { type: '' })
    ).toEqual(initialState);
  });

  it('should handle addIngredient for bun', () => {
    const action = currentBurgerComponentsSlice.actions.addIngredient(mockBun);
    const state = currentBurgerComponentsSlice.reducer(initialState, action);

    expect(state.bun).toMatchObject({ ...mockBun, key: expect.any(String) });
    expect(state.orderIds).toEqual([mockBun._id]);
  });

  it('should handle addIngredient for a non-bun ingredient', () => {
    const action =
      currentBurgerComponentsSlice.actions.addIngredient(mockIngredient);
    const state = currentBurgerComponentsSlice.reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);

    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      key: expect.any(String),
    });
    expect(state.orderIds).toEqual([mockIngredient._id]);
  });

  it('should handle removeIngredient', () => {
    const intermediateState = {
      ...initialState,
      ingredients: [{ ...mockIngredient, key: 'random-key' }],
      orderIds: [mockIngredient._id],
    };

    const action = currentBurgerComponentsSlice.actions.removeIngredient(0);
    const state = currentBurgerComponentsSlice.reducer(
      intermediateState,
      action
    );

    expect(state.ingredients).toHaveLength(0);
    expect(state.orderIds).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const ingredient1 = { ...mockIngredient, _id: '2', key: 'key-1' };
    const ingredient2 = {
      ...mockIngredient,
      _id: '3',
      key: 'key-2',
      name: 'Tomato',
    };

    const intermediateState = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };

    const action = currentBurgerComponentsSlice.actions.moveIngredient({
      from: 0,
      to: 1,
    });
    const state = currentBurgerComponentsSlice.reducer(
      intermediateState,
      action
    );

    expect(state.ingredients[0]).toMatchObject(ingredient2);
    expect(state.ingredients[1]).toMatchObject(ingredient1);
  });
});

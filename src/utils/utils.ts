import { Ingredient, OrderInfo } from '@/types';

export const getStatus = (status?: OrderInfo['status']) => {
  if (status === 'created') return 'Создан';
  if (status === 'pending') return 'В обработке';

  return 'Выполнен';
};

export const formatIngredients = (ingredients: Ingredient[]) => {
  const ingredientCount: Record<
    string,
    { count: number; ingredient: Ingredient }
  > = {};

  ingredients?.forEach((ingredient) => {
    const id = ingredient._id;
    if (ingredientCount[id]) {
      ingredientCount[id].count += 1;
    } else {
      if (ingredient.type === 'bun') {
        ingredientCount[id] = { count: 2, ingredient };
        return;
      }

      ingredientCount[id] = { count: 1, ingredient };
    }
  });

  return Object.values(ingredientCount).map((item) => [
    item.count,
    item.ingredient,
  ]) as [number, Ingredient][];
};

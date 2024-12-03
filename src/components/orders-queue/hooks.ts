import { useGetIngredientsQuery } from '@/services';
import { Ingredient } from '@/types';
import { formatIngredients } from '@/utils';
import { useMemo } from 'react';

export const useIngredients = (ingredientIds?: string[]) => {
  const { data } = useGetIngredientsQuery();

  const currentIngredients = useMemo(() => {
    return ingredientIds?.reduce((prev, curr) => {
      const ingredient = data?.data.find(
        (ingredient) => ingredient._id === curr
      );

      if (!ingredient) return prev;

      return prev.concat(ingredient);
    }, [] as Ingredient[]);
  }, [data?.data, ingredientIds]);

  const amount = useMemo(() => {
    if (!data?.data || !ingredientIds) return 0;

    return data.data
      .filter(({ _id }) => ingredientIds.includes(_id))
      .reduce((total, ingredient) => {
        const price =
          ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price;
        return total + price;
      }, 0);
  }, [data?.data, ingredientIds]);

  return {
    currentIngredients,
    amount,
    totalIngredients: formatIngredients(currentIngredients ?? []),
  };
};

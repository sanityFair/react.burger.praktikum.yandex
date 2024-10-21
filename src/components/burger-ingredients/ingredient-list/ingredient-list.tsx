import { BurgerIngredient } from '../burger-ingredient';

import bunListStyles from './ingredient-list.module.css';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectIngredients } from '@/services';
import isEqual from 'lodash.isequal';
import { Outlet } from 'react-router';

type Props = {
  type: 'bun' | 'sauce' | 'main';
  title: string;
};

export const IngredientList = forwardRef<HTMLDivElement, Props>(
  ({ type, title }, ref) => {
    const ingredients = useSelector(selectIngredients, isEqual);
    const items = useMemo(
      () => ingredients.filter((item) => item.type === type),
      [ingredients]
    );

    return (
      <>
        <div className={bunListStyles.root} ref={ref}>
          <h6 className='text text_type_main-medium'>{title}</h6>
          <div className={bunListStyles.items}>
            {items.map((item) => (
              <BurgerIngredient {...item} key={`${item._id}-${item.name}`} />
            ))}
          </div>
        </div>
        <Outlet />
      </>
    );
  }
);

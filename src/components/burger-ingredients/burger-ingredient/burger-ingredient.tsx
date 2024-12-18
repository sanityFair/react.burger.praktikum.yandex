import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientStyles from './burger-ingredient.module.css';
import { Ingredient } from '@/types';
import { memo, useMemo } from 'react';
import {
  currentIngredientSlice,
  selectIdsCurrentBurgerIngredients,
} from '@/services';
import { useDrag } from 'react-dnd';
import isEqual from 'lodash.isequal';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks';

type Props = Partial<
  Ingredient & {
    testid?: string;
  }
>;

export const BurgerIngredient = memo((props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ids = useAppSelector(selectIdsCurrentBurgerIngredients, isEqual);
  const count = useMemo(
    () => ids.filter((id) => id === props._id).length,
    [props._id, ids]
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: props.type!,
    item: { ...props },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleSelectIngredient = () => {
    dispatch(currentIngredientSlice.actions.selectIngredient(props));
    navigate(`/ingredients/${props._id}`, {
      state: { modal: true },
    });
  };

  return (
    !isDrag && (
      <div
        className={burgerIngredientStyles.root}
        onClick={handleSelectIngredient}
        draggable={true}
        ref={dragRef}
        data-testid={props.testid}
      >
        <div className={burgerIngredientStyles.imageContainer}>
          <img src={props.image} alt={props.name} width='100%' />
          {!!count && <Counter count={count} size='default' />}
        </div>
        <span
          className={burgerIngredientStyles.price.concat(
            ' text text_type_main-small'
          )}
        >
          {props.price} <CurrencyIcon type='primary' />
        </span>
        <p className='text text_type_main-small'>{props.name}</p>
      </div>
    )
  );
});

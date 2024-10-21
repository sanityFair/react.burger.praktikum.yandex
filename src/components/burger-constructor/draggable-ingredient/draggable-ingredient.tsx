import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import draggableIngredientStyles from './draggable-ingredient.module.css';
import { Ingredient } from '@/types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { currentBurgerComponentsSlice } from '@/services';
import classNames from 'classnames';

type Props = Partial<Ingredient> & {
  index?: number;
};

export const DraggableIngredient = ({
  name = '',
  price = 0,
  image = '',
  index = 0,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [{ isHover }, drop] = useDrop({
    accept: 'item',
    drop(item: Record<'index', number>) {
      dispatch(
        currentBurgerComponentsSlice.actions.moveIngredient({
          from: item.index,
          to: index,
        })
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [{ cursor }, drag] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      cursor: monitor.isDragging() ? 'grabbing' : 'grab',
    }),
  });

  const removeIngredient = () => {
    dispatch(currentBurgerComponentsSlice.actions.removeIngredient(index));
  };

  drag(drop(ref));

  return (
    <div
      className={classNames(draggableIngredientStyles.root, {
        [draggableIngredientStyles.hover]: isHover,
      })}
      ref={ref}
      draggable={true}
      style={{ cursor }}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={removeIngredient}
      />
    </div>
  );
};

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor.module.css';
import { OrderDetails } from '../order-details';
import { useAppDispatch, useAppSelector, useBoolean } from '@/hooks';
import { Modal } from '../modal';
import {
  currentBurgerComponentsSlice,
  selectCurrentBurgerBun,
  selectCurrentBurgerIngredients,
  selectIdsCurrentBurgerIngredients,
  useCreateOrderMutation,
  useGetUserQuery,
} from '@/services';
import isEqual from 'lodash.isequal';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { Bun } from './bun';
import { DraggableIngredient } from './draggable-ingredient';
import { Ingredient } from '@/types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const [createOrder, { data }] = useCreateOrderMutation();
  const [isOpen, { off, on }] = useBoolean(false);
  const { isError } = useGetUserQuery();
  const bun = useAppSelector(selectCurrentBurgerBun, isEqual);
  const ingredients = useAppSelector(selectCurrentBurgerIngredients, isEqual);
  const ids = useAppSelector(selectIdsCurrentBurgerIngredients, isEqual);
  const amount = useMemo(
    () =>
      ids.reduce((prev, id) => {
        if (bun?._id === id) {
          return (prev += bun.price * 2);
        }

        const ingredient = ingredients.find(
          (ingredient) => ingredient._id === id
        );

        if (ingredient) return (prev += ingredient.price);

        return prev;
      }, 0),
    [ids, ingredients, bun]
  );
  const dispatch = useAppDispatch();

  const [{ isBunHover }, dropTargetBun] = useDrop({
    accept: 'bun',
    drop(ingredient: Ingredient) {
      dispatch(currentBurgerComponentsSlice.actions.addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isBunHover: monitor.isOver(),
    }),
  });

  const [{ isIngredientHover }, dropTargetIngredient] = useDrop({
    accept: ['main', 'sauce'],
    drop(ingredient: Ingredient) {
      dispatch(currentBurgerComponentsSlice.actions.addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isIngredientHover: monitor.isOver(),
    }),
  });

  const handleCreateOrder = async () => {
    if (isError) {
      navigate('/login');
      return;
    }
    await createOrder({ ingredients: ids }).unwrap();
    on();
  };

  return (
    <section className={burgerConstructorStyles.root} ref={dropTargetBun}>
      <div className={burgerConstructorStyles.item}>
        <Bun
          position='top'
          name={bun?.name.concat(' (верх)')}
          isHover={isBunHover}
          image={bun?.image}
          price={bun?.price}
        />
      </div>
      <div
        className={classNames(burgerConstructorStyles.content, {
          [burgerConstructorStyles.hover]: isIngredientHover,
          [burgerConstructorStyles.empty]: !ingredients.length,
        })}
        ref={dropTargetIngredient}
      >
        {ingredients
          .filter((item) => item.type !== 'bun')
          .map((item, index) => (
            <DraggableIngredient {...item} index={index} key={item.key} />
          ))}
      </div>
      <div className={burgerConstructorStyles.item}>
        <Bun
          position='bottom'
          name={bun?.name.concat(' (низ)')}
          isHover={isBunHover}
          image={bun?.image}
          price={bun?.price}
        />
      </div>
      <div className={burgerConstructorStyles.order}>
        <span className='text text_type_digits-medium '>
          {amount} <CurrencyIcon type='primary' />
        </span>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          extraClass='ml-4'
          onClick={handleCreateOrder}
        >
          Оформить заказ
        </Button>
        <div className={burgerConstructorStyles.spacer} />
      </div>
      <Modal isOpen={isOpen} onClose={off}>
        {data && <OrderDetails orderId={data.order.number} />}
      </Modal>
    </section>
  );
};

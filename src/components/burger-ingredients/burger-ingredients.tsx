import { useEffect, useRef, useState } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientList } from './ingredient-list';

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const contentRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bunRef.current || !sauceRef.current || !contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      const bunOffsetTop = bunRef.current.offsetTop;
      const sauceOffsetTop = sauceRef.current.offsetTop;

      const isBun = scrollTop < bunOffsetTop;
      const isSauce = scrollTop > bunOffsetTop / 2;
      const isMain = scrollTop > sauceOffsetTop;

      if (isBun) setCurrent('bun');

      if (isSauce) setCurrent('sauce');

      if (isMain) setCurrent('main');
    };

    contentRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      contentRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.content} ref={contentRef}>
        <IngredientList type='bun' title='Булки' ref={bunRef} />
        <IngredientList type='sauce' title='Соусы' ref={sauceRef} />
        <IngredientList type='main' title='Начинки' />
      </div>
    </section>
  );
};

import { BurgerIngredients, BurgerConstructor } from '@/components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './styles.module.css';
import { Loader } from '@/components/loader';
import { useGetIngredientsQuery } from '@/services';

export const HomePage = () => {
  const { isFetching } = useGetIngredientsQuery();

  if (isFetching) return <Loader />;

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
};

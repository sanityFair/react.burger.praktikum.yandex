import { useLocation, useNavigate, useParams } from 'react-router';
import styles from './styles.module.css';
import { IngredientDetails } from '@/components/ingredient-details';
import { Modal } from '@/components';
import { useGetIngredientsQuery } from '@/services';
import { useMemo } from 'react';

export const IngredientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentData } = useGetIngredientsQuery();
  const currentIngredient = useMemo(
    () => currentData?.data.find((item) => item._id === id),
    [currentData, id]
  );

  const handleClose = () => navigate(-1);

  if (!location.state?.modal) {
    return (
      <div className={styles.root}>
        <IngredientDetails {...currentIngredient} />
      </div>
    );
  }

  return (
    <Modal
      isOpen={Object.keys(currentIngredient ?? {}).length !== 0}
      onClose={handleClose}
      title='Детали ингредиента'
    >
      <IngredientDetails {...currentIngredient} />
    </Modal>
  );
};

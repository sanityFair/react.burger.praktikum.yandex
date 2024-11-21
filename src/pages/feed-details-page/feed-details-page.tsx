import { useLocation, useNavigate, useParams } from 'react-router';
import styles from './styles.module.css';
import { getStatus } from '@/utils';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Amount, IngredientPreview, Modal } from '@/components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useGetOrdersQuery } from '@/services';
import { useIngredients } from '@/components/orders-queue';
import { Loader } from '@/components/loader';

export const FeedDetailsPage = () => {
  const { state } = useLocation();
  const { data } = useGetOrdersQuery();
  const params = useParams();
  const navigate = useNavigate();
  const currentOrder = useMemo(
    () => data?.orders.find((order) => order.number === Number(params.id)),
    [params?.id, data?.orders]
  );
  const { amount, totalIngredients } = useIngredients(
    currentOrder?.ingredients
  );

  const handleClose = () => navigate(-1);

  if (!data?.success) return <Loader />;

  if (!state?.modal) {
    return (
      <div className={styles.root}>
        <p
          className={classNames(styles.number, 'text text_type_digits-default')}
        >
          #{currentOrder?.number}
        </p>
        <br />
        <div className={styles.header}>
          <p className='text text_type_main-medium'>{currentOrder?.name}</p>
          <p className={classNames(styles.status, 'text text_type_main-small')}>
            {getStatus(currentOrder?.status)}
          </p>
        </div>
        <br />
        <p className='text text_type_main-medium'>Состав:</p>
        <br />
        <div className={styles.ingredients}>
          {totalIngredients?.map(([count, ingredient]) => (
            <div className={styles.ingredient} key={ingredient.name}>
              <IngredientPreview imageUrl={ingredient.image_mobile} />
              <p className='text text_type_main-default'>{ingredient.name}</p>
              <p
                className={classNames(
                  styles.counter,
                  'text text_type_digits-default'
                )}
              >
                {count} x <Amount value={ingredient.price} />
              </p>
            </div>
          ))}
        </div>
        <div className={styles.info}>
          <FormattedDate
            date={new Date(`${currentOrder?.createdAt}`)}
            className='text_type_main-small text_color_inactive'
          />
          <Amount value={amount} />
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={totalIngredients.length !== 0}
      onClose={handleClose}
      title={`#${state?.number}`}
    >
      <div className={styles.root}>
        <br />
        <div className={styles.header}>
          <p className='text text_type_main-medium'>{currentOrder?.name}</p>
          <p className={classNames(styles.status, 'text text_type_main-small')}>
            {getStatus(currentOrder?.status)}
          </p>
        </div>
        <br />
        <p className='text text_type_main-medium'>Состав:</p>
        <br />
        <div className={styles.ingredients}>
          {totalIngredients?.map(([count, ingredient]) => (
            <div className={styles.ingredient} key={ingredient.name}>
              <IngredientPreview imageUrl={ingredient.image_mobile} />
              <p className='text text_type_main-default'>{ingredient.name}</p>
              <p
                className={classNames(
                  styles.counter,
                  'text text_type_digits-default'
                )}
              >
                {count} x <Amount value={ingredient.price} />
              </p>
            </div>
          ))}
        </div>
        <div className={styles.info}>
          <FormattedDate
            date={new Date(`${currentOrder?.createdAt}`)}
            className='text_type_main-small text_color_inactive'
          />
          <Amount value={amount} />
        </div>
      </div>
    </Modal>
  );
};

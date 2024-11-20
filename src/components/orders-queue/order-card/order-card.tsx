import { OrderInfo } from '@/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { IngredientPreview } from '@/components/ingredient-preview';
import { Amount } from '@/components';
import { useIngredients } from '../hooks';

type Props = Partial<OrderInfo>;

export const OrderCard = ({
  createdAt,
  number,
  name,
  status,
  ingredients: ingredientIds,
}: Props) => {
  const { currentIngredients, amount } = useIngredients(ingredientIds);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Link
          to={`${number}`}
          state={{
            ingredients: currentIngredients,
            amount,
            createdAt,
            number,
            name,
            status,
            modal: true,
          }}
          className='text text_type_digits-default'
        >
          #{number}
        </Link>
        <FormattedDate
          date={new Date(`${createdAt}`)}
          className='text_type_main-small text_color_inactive'
        />
      </div>
      <p className={classNames(styles.name, 'text text_type_main-medium')}>
        {name}
      </p>
      <div className={styles.body}>
        <div className={styles.images}>
          {currentIngredients?.slice(0, 6).map((ingredient, index) => (
            <IngredientPreview
              imageUrl={ingredient.image_mobile}
              className={styles.circle}
              key={`${index}-${number}`}
              count={index === 5 ? `+${currentIngredients.length - 6}` : ''}
            />
          ))}
        </div>
        <Amount value={amount} />
      </div>
    </div>
  );
};

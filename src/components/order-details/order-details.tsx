import orderDetailsStyles from './order-details.module.css';
import classNames from 'classnames';

type Props = {
  orderId: number;
};

export const OrderDetails = ({ orderId }: Props) => (
  <div className={orderDetailsStyles.root}>
    <div className={orderDetailsStyles.order}>
      <p className='text text_type_digits-large' data-testid='order-number'>
        {orderId}
      </p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
    </div>
    <div className={classNames(orderDetailsStyles.icon, 'mt-15 mb-15')} />
    <p className='text text_type_main-small mb-2'>Ваш заказ начали готовить</p>
    <p className='text text_type_main-small text_color_inactive mb-15'>
      Дождитесь готовности на орбитальной станции
    </p>
  </div>
);

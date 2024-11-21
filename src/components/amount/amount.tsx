import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import classNames from 'classnames';

type Props = {
  value: number;
};

export const Amount = ({ value }: Props) => (
  <span className={classNames(styles.root, 'text text_type_digits-default')}>
    {value} <CurrencyIcon type='primary' />
  </span>
);

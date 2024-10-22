import { Ingredient } from '@/types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import bunStyles from './bun.module.css';
import classNames from 'classnames';

type Props = Partial<Ingredient> & {
  text?: boolean;
  className?: string;
  position: 'top' | 'bottom' | undefined;
  isHover?: boolean;
};

export const Bun = ({
  price,
  image,
  name = '',
  className,
  position,
  isHover,
}: Props) => (
  <div className={bunStyles.root}>
    <ConstructorElement
      type={position}
      isLocked={true}
      text={name}
      price={price || 0}
      thumbnail={image || ''}
      extraClass={classNames(
        bunStyles.ingredient,
        {
          [bunStyles.hover]: isHover,
        },
        className
      )}
    />
    <div className={bunStyles.spacer} />
  </div>
);

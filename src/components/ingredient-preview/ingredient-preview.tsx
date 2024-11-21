import classNames from 'classnames';
import styles from './styles.module.css';

type Props = {
  imageUrl?: string;
  alt?: string;
  count?: string;
  className?: string;
};

export const IngredientPreview = ({
  imageUrl,
  className,
  alt = 'image',
  count,
}: Props) => (
  <div
    {...(count ? { 'data-count': count } : {})}
    className={classNames(styles.root, className)}
  >
    <img src={imageUrl} alt={alt} />
  </div>
);

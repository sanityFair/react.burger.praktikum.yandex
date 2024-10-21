import itemStyles from './item.module.css';

type Props = {
  name: React.ReactNode;
  value: React.ReactNode;
};

export const Item = ({ name, value }: Props) => (
  <div className={itemStyles.root}>
    <p className='text text_type_main-default text_color_inactive'>{name}</p>
    <p className='text text_type_main-default text_color_inactive'>{value}</p>
  </div>
);

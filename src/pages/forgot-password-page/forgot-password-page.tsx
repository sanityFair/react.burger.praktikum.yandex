import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useResetPasswordMutation } from '@/services';
import { ChangeEvent, FormEventHandler, useState } from 'react';

export const ForgotPasswordPage = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [resetPassword, { isSuccess, data }] = useResetPasswordMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!value) {
      setError('Укажите почту');
      return;
    }

    resetPassword({ email: value });
  };

  if (isSuccess && data.success)
    return <Navigate to='/reset-password' state={{ requestCode: true }} />;

  return (
    <div className={styles.root}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          type='text'
          placeholder='E-mail'
          error={Boolean(error)}
          errorText={error}
          name='email'
          size='default'
          extraClass='mt-5'
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-5'
        >
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pt-10'>
        Вспомнили пароль?
        <Link to='/login' className='text text_type_main-default'>
          Войти
        </Link>
      </p>
    </div>
  );
};

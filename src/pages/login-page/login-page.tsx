import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useLoginMutation } from '@/services';
import { RegistrationPayload } from '@/types';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import classNames from 'classnames';

export const LoginPage = () => {
  const [login, { isSuccess, data, isError, error }] = useLoginMutation();
  const [formData, setFormData] = useState<Omit<RegistrationPayload, 'name'>>({
    password: '',
    email: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isSuccess && data.success) return <Navigate to='/' replace />;

  return (
    <div className={styles.root}>
      <p className='text text_type_main-medium'>Вход</p>
      <form onSubmit={handleSubmit}>
        <Input
          value={formData.email}
          onChange={handleChange}
          type='text'
          placeholder='E-mail'
          name='email'
          errorText='Ошибка'
          size='default'
          extraClass='mt-5'
        />
        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          placeholder='Пароль'
          icon='ShowIcon'
          name='password'
          errorText='Ошибка'
          size='default'
          extraClass='mt-5'
        />
        {isError && 'data' in error && (
          <p
            className={classNames(
              styles.error,
              'text text_type_main-default mt-5'
            )}
          >
            {(error.data as Record<string, string>).message}
          </p>
        )}
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-5'
          disabled={!formData.email || !formData.password}
        >
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pt-10'>
        Вы — новый пользователь?
        <Link to='/register' className='text text_type_main-default'>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive pt-4'>
        Забыли пароль?
        <Link to='/forgot-password' className='text text_type_main-default'>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

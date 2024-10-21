import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { Link, Navigate } from 'react-router-dom';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { RegistrationPayload } from '@/types';
import { useRegisterMutation } from '@/services';
import classNames from 'classnames';

export const RegistrationPage = () => {
  const [register, { isSuccess, data, isError, error }] = useRegisterMutation();
  const [formData, setFormData] = useState<RegistrationPayload>({
    password: '',
    email: '',
    name: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    register(formData);
  };

  if (isSuccess && data.success) return <Navigate to='/' replace />;

  return (
    <div className={styles.root}>
      <p className='text text_type_main-medium'>Регистрация</p>
      <form onSubmit={handleSubmit}>
        <Input
          value={formData.name}
          onChange={handleChange}
          type='text'
          placeholder='Имя'
          name='name'
          size='default'
          extraClass='mt-5'
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          type='text'
          placeholder='E-mail'
          name='email'
          size='default'
          extraClass='mt-5'
        />
        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          placeholder='Пароль'
          icon='ShowIcon'
          name='password'
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
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pt-10'>
        Уже зарегистрированы?
        <Link to='/login' className='text text_type_main-default'>
          Войти
        </Link>
      </p>
    </div>
  );
};

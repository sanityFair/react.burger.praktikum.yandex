import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { Link, Navigate } from 'react-router-dom';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useChangePasswordMutation } from '@/services';
import { ChangePasswordPayload } from '@/types';
import classNames from 'classnames';

export const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<ChangePasswordPayload>({
    password: '',
    token: '',
  });
  const [changePassword, { isSuccess, data, isError }] =
    useChangePasswordMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    changePassword(formData);
  };

  if (isSuccess && data.success) return <Navigate to='/login' replace />;

  return (
    <div className={styles.root}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          placeholder='Введите новый пароль'
          icon='ShowIcon'
          name='password'
          size='default'
          extraClass='mt-5'
        />
        <Input
          value={formData.token}
          onChange={handleChange}
          type='text'
          placeholder='Введите код из письма'
          name='token'
          size='default'
          extraClass='mt-5'
        />
        {isError && (
          <p
            className={classNames(
              styles.error,
              'text text_type_main-default mt-5'
            )}
          >
            Неправильный токен сброса
          </p>
        )}
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-5'
          disabled={!formData.token || !formData.password}
        >
          Сохранить
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive pt-4'>
        Вспомнили пароль?
        <Link to='/forgot-password' className='text text_type_main-default'>
          Войти
        </Link>
      </p>
    </div>
  );
};

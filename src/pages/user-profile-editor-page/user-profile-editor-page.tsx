import { useGetUserQuery, usePatchUserMutation } from '@/services';
import styles from './styles.module.css';
import { EditableInput } from '@/components';

export const UserProfileEditorPage = () => {
  const { currentData } = useGetUserQuery();
  const [patchUser] = usePatchUserMutation();

  const handleUserUpdate = (value: Record<string, string>) => {
    patchUser(value);
  };

  if (!currentData?.success) return null;

  return (
    <div className={styles.root}>
      <EditableInput
        initialValue={currentData.user.name}
        type='text'
        placeholder='Имя'
        name='name'
        errorText='Ошибка'
        callback={handleUserUpdate}
        size='default'
      />
      <EditableInput
        initialValue={currentData.user.email}
        type='text'
        placeholder='Логин'
        name='login'
        errorText='Ошибка'
        callback={handleUserUpdate}
        size='default'
      />
      <EditableInput
        initialValue='******'
        type='password'
        placeholder='Пароль'
        name='password'
        errorText='Ошибка'
        callback={handleUserUpdate}
        size='default'
      />
    </div>
  );
};

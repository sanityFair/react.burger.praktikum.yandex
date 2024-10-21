import { useBoolean } from '@/hooks';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

type Props = Omit<Parameters<typeof Input>['0'], 'value' | 'onChange'> & {
  callback?: (value: Record<string, string>) => void;
  initialValue: string;
};

export const EditableInput = ({ callback, initialValue, ...props }: Props) => {
  const [editable, { toggle }] = useBoolean(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleBlur = () => {
    toggle();
    inputRef.current &&
      callback?.({ [inputRef.current.name]: inputRef.current.value });
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      disabled={!editable}
      icon={!editable ? 'EditIcon' : props.icon}
      ref={inputRef}
      onBlur={handleBlur}
      onIconClick={toggle}
    />
  );
};

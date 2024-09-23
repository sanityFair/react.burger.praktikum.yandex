import { useRef, useState } from "react";

export const useBoolean = (
  initialValue: boolean = false
): [
  boolean,
  {
    toggle: () => void;
    on: () => void;
    off: () => void;
  }
] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const updateValue = useRef({
    toggle: () => setValue((oldValue) => !oldValue),
    on: () => setValue(true),
    off: () => setValue(false),
  });

  return [value, updateValue.current];
};

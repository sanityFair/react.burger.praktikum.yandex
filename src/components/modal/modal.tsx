import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { Portal, ModalOverlay } from '@/components';
import { useEffect, useRef } from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key === 'Escape') {
        onClose();
      }

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleClick);
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, []);

  return (
    <Portal>
      <ModalOverlay isOpen={isOpen}>
        <div className={modalStyles.modal} ref={wrapperRef}>
          <div className={modalStyles.header}>
            <h1 className='text text_type_main-large'>{title}</h1>
            <CloseIcon type='primary' onClick={onClose} />
          </div>
          <div className={modalStyles.content}>{children}</div>
        </div>
      </ModalOverlay>
    </Portal>
  );
};

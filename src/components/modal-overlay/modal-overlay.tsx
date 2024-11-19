import modalOverlayStyles from './modal-overlay.module.css';

type ModalOverlayProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;

  return <div className={modalOverlayStyles.root}>{children}</div>;
};

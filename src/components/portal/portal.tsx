import { createPortal } from "react-dom";

type PortalProps = {
  elementId?: string;
  children: React.ReactNode;
};

export const Portal = ({ children, elementId = "modal-root" }: PortalProps) => {
  const el = document.getElementById(elementId)!;

  return createPortal(children, el);
};

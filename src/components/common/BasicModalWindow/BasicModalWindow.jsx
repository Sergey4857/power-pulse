import { createPortal } from 'react-dom';

export default function BasicModalWindow() {
  const modalRoot = document.querySelector('#modal-root');

  return createPortal(<div>BasicModalWindow component</div>, modalRoot);
}
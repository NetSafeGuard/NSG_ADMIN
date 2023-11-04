import { useEffect } from 'react';

export const NoContextMenu = () => {
  const disableContextMenu = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return null;
};
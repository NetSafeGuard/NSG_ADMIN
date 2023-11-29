import { useEffect } from 'react';

export const NoContextMenu = () => {
  const disableContextMenu = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };  


  return null;
};
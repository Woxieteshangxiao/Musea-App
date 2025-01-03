import { useLocation } from 'react-router-dom';

export function useHideMiniPlayer() {
  const location = useLocation();
  const shouldHide = location.pathname.startsWith('/song/');
  
  return shouldHide;
}
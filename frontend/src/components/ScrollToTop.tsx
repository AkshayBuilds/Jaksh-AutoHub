import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Fade out current page
    document.body.style.opacity = '0';
    
    // Reduced delay from 300ms to 150ms
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      document.body.style.opacity = '1';
    }, 100); // Reduced timeout
  }, [pathname]);

  return null;
}

export default ScrollToTop; 
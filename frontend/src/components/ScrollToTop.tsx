import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Fade out current page
    document.body.style.opacity = '0';
    
    // Small delay for fade out effect
    setTimeout(() => {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      
      // Fade in new page
      document.body.style.opacity = '1';
    }, 300);
  }, [pathname]);

  return null;
}

export default ScrollToTop; 
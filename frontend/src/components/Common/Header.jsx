import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Topbar from '../Layout/Topbar'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header at the very top of the page
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`border-b border-neutral-200 bg-white/75 backdrop-blur-md w-full z-50 shadow-sm sticky top-0 transition-transform duration-300 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Topbar />
      <Navbar />
    </header>
  )
}

export default Header;
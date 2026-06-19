import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Topbar from '../Layout/Topbar'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsVisible(true);
        setIsTop(true);
      } else {
        setIsTop(false);
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isTransparent = isHomePage && isTop;
  const positionClass = isHomePage ? "fixed" : "sticky";
  const bgClass = isTransparent
    ? "bg-transparent border-transparent shadow-none"
    : "bg-white border-b border-neutral-200 shadow-sm";

  return (
    <header className={`${positionClass} ${bgClass} w-full z-50 top-0 transition-all duration-300 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Topbar />
      <Navbar isTransparent={isTransparent} />
    </header>
  )
}

export default Header;
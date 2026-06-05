import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const UserLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      {/*Main content*/}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;

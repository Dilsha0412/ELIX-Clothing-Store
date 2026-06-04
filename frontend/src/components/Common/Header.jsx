import React from 'react'
import Navbar from './Navbar'
import Topbar from '../Layout/Topbar'

const Header = () => {
  return (
    <header className='border-b border-neutral-200 bg-white sticky top-0 z-50 shadow-md'>
      <Topbar />
      <Navbar />
    </header>
  )
}

export default Header;
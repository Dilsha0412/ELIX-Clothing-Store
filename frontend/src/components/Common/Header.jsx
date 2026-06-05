import React from 'react'
import Navbar from './Navbar'
import Topbar from '../Layout/Topbar'

const Header = () => {
  return (
    <header className='border-b border-neutral-200 bg-white/75 backdrop-blur-md w-full z-50 shadow-sm sticky top-0'>
      <Topbar />
      <Navbar />
    </header>
  )
}

export default Header;
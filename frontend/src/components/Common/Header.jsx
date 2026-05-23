import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='border-b border-neutral-900 bg-black sticky top-0 z-50 shadow-md'>
       <Navbar/>
    </header>
  )
}

export default Header
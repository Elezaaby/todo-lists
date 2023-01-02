import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from './Navbar';
import Sidebaar from './Sidebaar';
import './Header.scss'


const Header = () => {
  return (
    <div>
      <ProSidebarProvider>
        <Navbar />
        <Sidebaar />
      </ProSidebarProvider>
    </div>
  )
}

export default Header
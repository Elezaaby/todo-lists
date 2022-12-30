import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from './Navbar';
import Sidebaar from './Sidebaar';
import './Header.scss'


const Header = ({userData,logOut}) => {
  return (
    <div>
      <ProSidebarProvider>
        <Navbar userData={userData} logOut={logOut} />
        <Sidebaar />
      </ProSidebarProvider>
    </div>
  )
}

export default Header
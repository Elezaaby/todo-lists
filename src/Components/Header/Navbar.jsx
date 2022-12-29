import React from 'react'
import { useProSidebar } from 'react-pro-sidebar';
import avatar from '../images/avatar.jpeg'
import logo from '../images/logo.png'


const Navbar = () => {


  const { collapseSidebar } = useProSidebar();

  window.addEventListener('scroll', function () {
    const nav = this.document.querySelector('.navbar')
    nav.classList.toggle('active', window.scrollY > 10)
  })


  return (
    <section className='navbar'>
      <div className="icon">
        <i onClick={() => collapseSidebar()} className="fa-solid fa-bars"></i>
        <div className="logo_icon">
          <img src={logo} alt="" />
          <span>To Do</span>
        </div>
      </div>
      <div className="search_box">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder='Search...' />
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="avatar_settings">
        <i className="fa-solid fa-gear"></i>
        <div className="img_avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Navbar
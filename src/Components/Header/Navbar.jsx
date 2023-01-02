import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useProSidebar } from 'react-pro-sidebar';
import avatar from '../images/avatar.jpeg'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { UserDataContext } from './../../UserDataContext';


const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  let { userData } = useContext(UserDataContext)
  let { logOut } = useContext(UserDataContext)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
      {/* ---------------------------------------------- button Login and Register ---------------------------------------------- */}

      {userData ?
        <div className="avatar_settings">
          <i className="fa-solid fa-gear"></i>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={logOut} className='nav_btn' textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </div>
        :
        <div className="nav_btn">
          <button><Link to='todo-lists/login'> Login</Link></button>
          <button><Link to='todo-lists/register'>Register</Link></button>
        </div>}
    </section>
  )
}

export default Navbar
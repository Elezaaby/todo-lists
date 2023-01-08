import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';


const Sidebaar = () => {

  const [shwoSidebar, setShwoSidebar] = useState(false)
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/todo-lists/login" || location.pathname === "/todo-lists/register") {
      setShwoSidebar(false);
    }
    else {
      setShwoSidebar(true)
    }
  }, [location.pathname])


  return (
    <>
      {shwoSidebar ?
        <Sidebar className='sidebar' defaultCollapsed>
          <Menu className='sidebar_menu'>
            <MenuItem icon={<i className="fa-solid fa-note-sticky"></i>} routerLink={<Link to="todo-lists/home" />}>Notes</MenuItem>
            <MenuItem icon={<i className="fa-regular fa-bell"></i>} routerLink={<Link to="todo-lists/reminders" />}>Reminders </MenuItem>
            <MenuItem icon={<i className="fa-regular fa-pen-to-square"></i>} routerLink={<Link to="/todo-lists" />}>Edit labels</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-box-archive"></i>} routerLink={<Link to="todo-lists/archive" />}>Archiving </MenuItem>
            <MenuItem icon={<i className="fa-regular fa-trash-can"></i>} routerLink={<Link to="todo-lists/trash" />}>Trash</MenuItem>
          </Menu>
        </Sidebar>
        : ''}
    </>
  )
}

export default Sidebaar
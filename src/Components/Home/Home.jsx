import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './Home.scss'
import Reminders from './../Reminders/Reminders';
import Login from './../Login/Login';
import Register from './../Register/Register';

const Home = () => {
  return (
    <div className='home'>
      <Routes>
        <Route path='todo-lists/login' element={<Login />} />
        <Route path='todo-lists/register' element={<Register />} />
        <Route path='todo-lists/reminders' element={<Reminders />} />
      </Routes>
    </div>
  )
}

export default Home
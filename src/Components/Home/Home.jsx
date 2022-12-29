import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './Home.scss'
import Reminders from './../Reminders/Reminders';

const Home = () => {
  return (
    <div className='home'>
      <Routes>
        <Route path='reminders' element={<Reminders />} />
      </Routes>
    </div>
  )
}

export default Home
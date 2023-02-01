import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import './Home.scss'
import Reminders from './../Reminders/Reminders';
import Login from './../Login/Login';
import Register from './../Register/Register';
import Notes from './../Notes/Notes';
import Notfund from './../Notfund/Notfund';
import TrashNote from './../TrashNote/TrashNote';

const Home = () => {

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to='/todo-lists/login' />
    }
    else {
      return children
    }
  }

  return (
    <div className='home'>
      <Routes>
        <Route path='todo-lists/login' element={<Login />} />
        <Route path='todo-lists/register' element={<Register />} />
        <Route path='todo-lists' element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path='todo-lists/home' element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path='todo-lists/reminders' element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
        <Route path='todo-lists/trash' element={<ProtectedRoute><TrashNote /></ProtectedRoute>} />
        <Route path='*' element={<ProtectedRoute><Notfund /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default Home
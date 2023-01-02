import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { UserDataContextProvider } from './UserDataContext';



function App() {

  return (
    <div className='app'>
      <UserDataContextProvider>
        <Header />
        <Home />
      </UserDataContextProvider>
    </div>
  );
}

export default App;

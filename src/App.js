import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



function App() {
  const [userData, setUserData] = useState(null)
  let navigate = useNavigate()



  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      gitUserData()
    }
  }, [])


  function gitUserData() {
    let userDecodede = jwtDecode(localStorage.getItem('userToken'))
    setUserData(userDecodede)
  }

  function logOut() {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/todo-lists/login')

  }
  return (
    <div className='app'>
      <Header userData={userData} logOut={logOut} />
      <Home gitUserData={gitUserData} />
    </div>
  );
}

export default App;

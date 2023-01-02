import { createContext } from "react";
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export let UserDataContext = createContext([])

export function UserDataContextProvider(props) {

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

  
  return <UserDataContext.Provider value={{ gitUserData,userData ,logOut }} >
    {props.children}
  </UserDataContext.Provider>
}
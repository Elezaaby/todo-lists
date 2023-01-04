import { createContext } from "react";
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export let UserDataContext = createContext([])

export function UserDataContextProvider(props) {

  const [userData, setUserData] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      gitUserData()
    }
    gitAllNotes()
  }, [])

  function gitUserData() {
    let userDecodede = jwtDecode(localStorage.getItem('userToken'))
    setUserData(userDecodede)
  }

  async function gitAllNotes() {
    let { data } = await axios.get('https://route-movies-api.vercel.app/getUserNotes', {
      headers: {
        Token: localStorage.getItem('userToken'),
        userID: userData._id
      }
    })
    setAllNotes(data.Notes)
  }

  function logOut() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('UserNote')
    setUserData(null)
    navigate('/todo-lists/login')
  }


  return <UserDataContext.Provider value={{ gitUserData, userData, logOut, allNotes, gitAllNotes }} >
    {props.children}
  </UserDataContext.Provider>
}
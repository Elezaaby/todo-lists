import { createContext } from "react";
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Noty from "noty";

import "noty/src/noty.scss";
import "noty/src/themes/metroui.scss";

export let UserDataContext = createContext([])

export function UserDataContextProvider(props) {

  const [userData, setUserData] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  let token = localStorage.getItem('userToken')

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

  async function gitAllNotes() {
    if (token) {
      var userDecodede = jwtDecode(token)
    }

    let { data } = await axios.get('https://route-movies-api.vercel.app/getUserNotes', {
      headers: {
        token,
        userID: userDecodede._id
      }
    })
    setAllNotes(data.Notes)
  }


  async function deleteNote(NoteID) {
    let token = localStorage.getItem('userToken')
    let { data } = await axios.delete('https://route-movies-api.vercel.app/deleteNote', {
      data: {
        NoteID,
        token
      }
    })
    if (data.message === "deleted") {
      gitAllNotes()
      showNotification("error", `Task was successfully ${data.message}`)
    }
  }


  function logOut() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('UserNote')
    setUserData(null)
    navigate('/todo-lists/login')
  }

  function showNotification(type, text) {
    new Noty({
      type: type,
      text: `<i class="fa-solid fa-check"></i> ${text}`,
      layout: "bottomRight",
      timeout: 2000,
      progressBar: true,
      closeWith: ["click"],
      theme: 'metroui',
    }).show();
  }


  return <UserDataContext.Provider value={{ gitUserData, userData, logOut, allNotes, gitAllNotes, deleteNote, showNotification }} >
    {props.children}
  </UserDataContext.Provider>
}
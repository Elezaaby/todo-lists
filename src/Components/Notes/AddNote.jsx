import { ClickAwayListener, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { UserDataContext } from './../../UserDataContext';

const AddNote = () => {

  const [showInputText, setShowInputText] = useState(false)
  const { gitAllNotes, showNotification } = useContext(UserDataContext)

  let token = localStorage.getItem('userToken')
  if (token) {
    var userDecodede = jwtDecode(token)
  }
  const [note, setNote] = useState({
    title: '',
    desc: '',
    userID: userDecodede._id,
    token
  })

  function gitValueInput(e) {
    let Mynote = { ...note }
    Mynote[e.target.name] = e.target.value
    setNote(Mynote)
  }


  function handleOnClick() {
    setShowInputText(false)

    if (note.title || note.desc) {
      addNote()
    }
  }


  async function addNote() {
    if (note.title || note.desc) {
      let { data } = await axios.post('https://route-movies-api.vercel.app/addNote', note)

      if (data.message === "success") {
        gitAllNotes()
        setNote({ title: '', desc: '', userID: userDecodede._id, token })
        showNotification("success", `Task was successfully ${data.message}`)
      }
    }
    else {

    }

  }



  return (
    <ClickAwayListener onClickAway={handleOnClick}>
      <div className='add_note'>
        {showInputText &&
          <TextField onChange={gitValueInput} value={note.title} name='title' placeholder='Titel' variant='standard' InputProps={{ disableUnderline: true }} style={{ marginBottom: 10 }} />
        }
        <TextField onChange={gitValueInput} value={note.desc} name='desc' onClick={() => setShowInputText(true)} placeholder='Take a note' variant='standard' InputProps={{ disableUnderline: true }} multiline maxRows={Infinity} />
        {showInputText && <button onClick={addNote}>Add Note</button>}
      </div>
    </ClickAwayListener >
  )
}

export default AddNote
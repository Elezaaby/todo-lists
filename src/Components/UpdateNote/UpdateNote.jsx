import React, { useContext, useState } from 'react'
import { CardActions, TextField } from '@mui/material'
import './UpdateNote.scss'
import jwtDecode from 'jwt-decode'
import { Archive } from '@mui/icons-material'
import { UserDataContext } from '../../UserDataContext'

export const UpdateNote = ({ note, open, handleClose }) => {
  const { deleteNote } = useContext(UserDataContext)


  let token = localStorage.getItem('userToken')
  if (token) {
    var userDecodede = jwtDecode(token)
  }

  const [updatenote, setUpdateNote] = useState({
    title: note.title,
    desc: note.desc,
    userID: userDecodede._id,
    token
  })


  // async function postUpdateNote() {
  //   let { data } = await axios.put('https://route-movies-api.vercel.app/updateNote', updatenote)
  //   console.log(data);
  // }

  function handledelete() {
    deleteNote(note._id)
    handleClose()
  }

  return (
    <>
      {open ?
        <>
          <div className='model'>
            <div onClick={handleClose} className="close_model"></div>
            <div className='model_input' >
              <i className="fa-solid fa-thumbtack icon_thumbtack" ></i>
              <TextField
                className='input_title'
                onChange={(e) => setUpdateNote({ ...updatenote, title: e.target.value })}
                value={updatenote.title}
                variant='standard'
                // fullWidth
                name='title'
                InputProps={{ disableUnderline: true }}
                multiline
                maxRows={Infinity} />

              <TextField className='input_desc' onChange={(e) => setUpdateNote({ ...updatenote, desc: e.target.value })} value={updatenote.desc} variant='standard' fullWidth name='desc' InputProps={{ disableUnderline: true }} multiline maxRows={Infinity} />

              <CardActions className='model_btn' >
                <i className="fa-regular fa-bell"></i>
                <i className="fa-solid fa-user-plus"></i>
                <i className="fa-solid fa-palette"></i>
                <i className="fa-regular fa-image"></i>
                <Archive fontSize='small' />
                <i onClick={handledelete} className="fa-solid fa-trash-can"></i>
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <div className="close">
                  <span onClick={handleClose} style={{ cursor: 'pointer', marginLeft: 'auto' }}>Close</span>
                </div>
              </CardActions>
            </div>
          </div>
        </>
        : ''}
    </>
  )
}

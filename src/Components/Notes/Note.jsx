import React, { useContext, useState } from 'react'
import { Card, CardActions, CardContent, styled, Typography } from '@mui/material'
import { ArchiveOutlined as Archive } from '@mui/icons-material'
import { UserDataContext } from '../../UserDataContext'
import { UpdateNote } from './../UpdateNote/UpdateNote';

const Note = ({ note }) => {
  const { deleteNote } = useContext(UserDataContext)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const StyledCard = styled(Card)`
    width: 240px;
    margin: 8px;
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  `


  return (
    <>
      <StyledCard className='note' >
        <CardContent onClick={handleOpen} >
          <Typography className='input_title'><i className="fa-solid fa-thumbtack icon_thumbtack" ></i> {note.title}</Typography>
          <Typography className='input_desc'>{note.desc}</Typography>
        </CardContent>
        <CardActions className='btn_note'>
          <i className="fa-solid fa-ellipsis-vertical"></i>
          <i className="fa-regular fa-bell"></i>
          <i className="fa-regular fa-image"></i>
          <i className="fa-solid fa-palette"></i>
          <i onClick={() => deleteNote(note._id)} className="fa-solid fa-trash-can"></i>
          <Archive fontSize='small' />
        </CardActions>
      </StyledCard>

      <UpdateNote note={note} open={open} handleClose={handleClose} />

    </>
  )
}

export default Note
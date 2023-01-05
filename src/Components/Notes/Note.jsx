import React, { useContext } from 'react'
import { Card, CardActions, CardContent, styled, Typography } from '@mui/material'
import { ArchiveOutlined as Archive } from '@mui/icons-material'
import { UserDataContext } from '../../UserDataContext'

const Note = ({ note }) => {
  const { deleteNote } = useContext(UserDataContext)


  const StyledCard = styled(Card)`
    width: 240px;
    margin: 8px;
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  `

  return (
    <StyledCard>
      <CardContent>
        <Typography>{note.title}</Typography>
        <Typography>{note.desc}</Typography>
      </CardContent>
      <CardActions>
        <Archive fontSize='small' style={{ marginLeft: 'auto' }} />
        <i style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => deleteNote(note._id)} className="fa-solid fa-trash-can"></i>
      </CardActions>
    </StyledCard>
  )
}

export default Note
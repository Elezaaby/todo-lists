import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../../UserDataContext'
import Note from './Note'
import './Notes.scss'
import AddNote from './AddNote';


const Notes = () => {
  const { allNotes, gitAllNotes } = useContext(UserDataContext)

  useEffect(() => {
    gitAllNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar
  }))

  return (
    <>
      <div className="container">
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ p: 3, width: '100%' }}>
            <DrawerHeader />
            <AddNote />
            <ul className="note_container">
              <Grid className='grid_container' container >
                {allNotes ? allNotes.map((note, index) =>
                  <Grid className='grid_note' key={index} item>
                    <Note note={note} />
                  </Grid>
                ) : <sapn className='noNote'>add first note!</sapn>}
              </Grid>
            </ul>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Notes
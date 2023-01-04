import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../../UserDataContext'
import Note from './Note'
import './Notes.scss'
import AddNote from './AddNote';


const Notes = () => {
  const { allNotes } = useContext(UserDataContext)
  const { gitAllNotes } = useContext(UserDataContext)

  useEffect(() => {
    gitAllNotes()
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
              <Grid container>
                {allNotes.map((note) =>
                  <Grid item>
                    <Note note={note} />
                  </Grid>
                )}
              </Grid>
            </ul>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Notes
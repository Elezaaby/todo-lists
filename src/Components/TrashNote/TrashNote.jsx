import React, { useContext } from 'react'
import { UserDataContext } from './../../UserDataContext';
import { Grid } from '@mui/material'
import Note from './../Notes/Note';

function TrashNote() {
  const { trashNote } = useContext(UserDataContext)
  console.log(trashNote);
  return (
    <div style={{ marginTop: '100px' }}>
      <ul className="note_container">
        <Grid className='grid_container' container >
          {trashNote ? trashNote.map((note, index) =>
            <Grid className='grid_note' key={index} item>
              <Note note={note} />
            </Grid>
          ) : <sapn className='noNote'>add first note!</sapn>}
        </Grid>
      </ul>
    </div>
  )
}

export default TrashNote
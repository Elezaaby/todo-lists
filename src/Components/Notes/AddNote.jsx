import { ClickAwayListener, TextField } from '@mui/material'
import React, { useState } from 'react'

const AddNote = () => {

  const [showInputText, setShowInputText] = useState(false)



  return (
    <ClickAwayListener onClickAway={() => setShowInputText(false)}>
      <div className='add_note'>
        {showInputText &&
          <TextField placeholder='Titel' variant='standard' InputProps={{ disableUnderline: true }} style={{ marginBottom: 10 }} />
        }
        <TextField onClick={() => setShowInputText(true)} placeholder='Take a note' variant='standard' InputProps={{ disableUnderline: true }} multiline maxRows={Infinity} />
      </div>
    </ClickAwayListener>
  )
}

export default AddNote
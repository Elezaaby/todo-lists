import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from './../../UserDataContext';
import './Notes.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Notes = () => {

  const StyleBox = styled(Box)`
    width: 600px;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    border: none;
    outline: none;
`




  let { allNotes } = useContext(UserDataContext)
  let { gitAllNotes } = useContext(UserDataContext)

  const [characters, updateCharacters] = useState(allNotes);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  useEffect(() => {
    gitAllNotes()
  }, [])



  return (
    <>
      <div className="container">

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>{(provided) => (
            <ul className="note_container" {...provided.droppableProps} ref={provided.innerRef}>
              {allNotes ? characters.map((note, index) => {
                return (
                  <Draggable key={'kfk' + index} draggableId={'droa' + index} index={index}>{(provided) => (
                    <li className='box_note' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                      <div className="hed_note">
                        <h4>{note.title}</h4>
                      </div>
                      <div className="body_note">
                        <span>{note.desc}</span>
                      </div>
                    </li>
                  )}
                  </Draggable>
                )
              }) : ''}
              {provided.placeholder}
            </ul>
          )}
          </Droppable>
        </DragDropContext>
      </div>

      <div>

        <Modal open={open} onClose={handleClose}>
          <StyleBox>
            <TextField onChange={(e) => setUpdateNote({ ...updatenote, title: e.target.value })} value={updatenote.title} fullWidth name='title' InputProps={{ disableUnderline: true }} multiline maxRows={Infinity} />

            <TextField onChange={(e) => setUpdateNote({ ...updatenote, desc: e.target.value })} value={updatenote.desc} fullWidth name='desc' InputProps={{ disableUnderline: true }} multiline maxRows={Infinity} />
            <CardActions >
              <i className="fa-regular fa-bell"></i>
              <i className="fa-solid fa-palette"></i>
              <Archive fontSize='small' />
              <i className="fa-solid fa-trash-can"></i>
              <i className="fa-regular fa-image"></i>
              <span onClick={handleClose} style={{ cursor: 'pointer', marginLeft: 'auto' }}>Close</span>
            </CardActions>
          </StyleBox>
        </Modal>
      </div>
    </>
  )
}

export default Notes
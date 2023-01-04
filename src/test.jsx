import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from './../../UserDataContext';
import './Notes.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Notes = () => {
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
    </>
  )
}

export default Notes
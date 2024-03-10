import React from 'react'
import NotesItem from './NotesItem'

export default function NotesContainer(props) {
  const Notes = props.notes
  return (
    <div>

      <h2 className='my-3'>Your Notes</h2>
      <div className="row row-cols-xs-1 row-cols-sm-2 row-cols-lg-3 my-3 g-4">
        {
          Notes.map((notes) => {
            return <NotesItem key={notes._id} notes={notes} />
          })
        }
      </div>
    </div>
  )
}

import React, { useContext } from 'react'
import { NoteContext } from '../Contexts/GlobalContext'

export default function NotesItem(props) {
  // FUNCTIONS
  async function handleDelete() {
    let authtoken = sessionStorage.getItem('authtoken')
    context.setLoader(true)
    let response = await context.deleteNote_APIcall(_id, authtoken)
    if (response) {
      let NewNotes = context.Notes.filter(note => {
        if (note._id != _id) {
          return note
        }
      })
      context.setNotes(NewNotes)
      context.setLoader(false)
      context.showAlert('Note Deleted successfully!')
    } else {
      context.setLoader(false)
      context.showAlert('Something went wrong!')
    }
  }
  function handleEdit() {
    context.setdisplay_Editpopup({ flag: true, note: props.notes })
  }

  // VARIABLES
  const { _id, title, tags, description } = props.notes
  const context = useContext(NoteContext)


  // RETURN
  return (
    <div>
      <div className="card" style={{ boxShadow: ' 5px 5px 5px #dedede' }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="buttonContainer d-flex justify-content-end">
            <button type="button" className="btn btn-primary" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i> Delete</button>
            <button type="button" className="btn btn-success mx-2" onClick={handleEdit}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

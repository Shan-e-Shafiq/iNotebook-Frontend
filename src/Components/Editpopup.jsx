import React, { useContext, useState } from 'react'
import { NoteContext } from '../Contexts/GlobalContext'

export default function Editpopup(props) {
  // FUNCTIONS
  async function UpdateNote(e) {
    e.preventDefault()
    let authtoken = sessionStorage.getItem('authtoken')
    const formData = new FormData(e.target)
    // converting formData to JSON format
    const NotesData = {}
    formData.forEach((value, key) => {
      NotesData[key] = value
    })
    let response = await context.updateNote_APIcall(props.note._id, NotesData, authtoken)
    if (response.acknowledged) { // ON UPDATE SUCCESS
      let newArray = context.Notes.map(note => {
        if (note._id == props.note._id) {
          return { ...note, ...NotesData }
        } else {
          return note
        }
      })
      context.setNotes(newArray)
      setIsAnimating(true)
      animationDelay().then(() => {
        setIsAnimating(false)
        context.setdisplay_Editpopup({ flag: false, note: {} })
      })
      context.showAlert('Note updated successfully')
    } else { // ON UPDATE FAILURE
      context.showAlert('Something went wrong')
    }
  }
  function handleClose(e) {
    e.preventDefault()
    setIsAnimating(true)
    animationDelay().then(() => {
      setIsAnimating(false)
      context.setdisplay_Editpopup({ flag: false, note: {} })
    })

  }

  function animationDelay() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 300);
    })
  }

  // VARIABLES
  const [title, settitle] = useState(props.note.title)
  const [tags, settags] = useState(props.note.tags)
  const [description, setdescription] = useState(props.note.description)
  const context = useContext(NoteContext)
  const [IsAnimating, setIsAnimating] = useState(false)

  // RETURN
  return (
    <div>
      <div className="Editpopup_container">
        <form className={`Editpopup ${IsAnimating ? 'closingAnimation' : ''}`} onSubmit={UpdateNote}>
          <button type="submit" className="close_btn btn btn-danger" onClick={handleClose}><i className="fa-solid fa-circle-xmark"></i> close</button>
          <h3 className='my-2'>Edit Note</h3>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" name='title' className="form-control" id="exampleFormControlInput1" placeholder="Type your title HERE" value={title} onChange={e => { settitle(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tags</label>
            <input type="text" name='tags' className="form-control" id="exampleFormControlInput1" placeholder="Type your title HERE" value={tags} onChange={e => { settags(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
            <textarea className="form-control" name='description' id="exampleFormControlTextarea1" rows="4" placeholder='Type your description HERE' value={description} onChange={e => { setdescription(e.target.value) }} style={{ resize: 'none' }}></textarea>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
            <label className="form-check-label" htmlFor="exampleCheck1" required={true} style={{ userSelect: 'none' }}>Are you sure to keep these changes?</label>
          </div>
          <button type="submit" className="btn btn-success"><i className="fa-solid fa-upload"></i> Update</button>
        </form>
      </div>
    </div>
  )
}

import React, { useContext } from 'react'
import { NoteContext } from '../Contexts/GlobalContext'
import Loader from './Loader'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'

export default function AddNotes() {
  // FUNCTIONS
  async function HandleSubmit(e) {
    e.preventDefault()
    let authtoken = sessionStorage.getItem('authtoken')
    if (authtoken == null || authtoken == '') {
      context.showAlert('You need to login first')
      navigate('/login')
      return
    }
    context.setLoader(true)
    const formData = new FormData(e.target)
    // converting formData to JSON format
    const NotesData = {}
    formData.forEach((value, key) => {
      if (value != '') {
        NotesData[key] = value
      }
    })
    let response = await context.addnote_APIcall(NotesData, authtoken)
    if (response.success) {
      context.setNotes([...context.Notes, response.data])
      context.setLoader(false)
      context.showAlert('Notes added successfully')
    } else {
      context.setLoader(false)
      context.showAlert('Something went wrong')
    }
  }

  // VARIABLES
  const context = useContext(NoteContext)
  const navigate = useNavigate()


  // RETURN
  return (
    <div>
      {/* CONDITIONAL RENDER */}
      {context.Loader ? <Loader /> : null}
      {context.userAlert.flag ? <Alert alert={context.userAlert.msg} /> : null}
      <form onSubmit={HandleSubmit}>
        <h1 className='text-center my-3'>Add notes</h1>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Title*</label>
          <input type="text" name='title' className="form-control" id="exampleFormControlInput1" placeholder="Type your title HERE" required={true} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Tags</label>
          <input type="text" name='tags' className="form-control" id="exampleFormControlInput1" placeholder="Type your title HERE" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description*</label>
          <textarea className="form-control" name='description' id="exampleFormControlTextarea1" rows="4" placeholder='Type your description HERE' required={true} style={{ resize: 'none' }}></textarea>
        </div>
        <button type="submit" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Add notes</button>
      </form>
    </div>
  )
}

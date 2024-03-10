import React, { useContext, useEffect } from 'react'
import AddNotes from './AddNotes'
import NotesContainer from './NotesContainer'
import { NoteContext } from '../Contexts/GlobalContext'
import Editpopup from './Editpopup'

export default function Home() {

  // FUNCTIONS
  async function fetchNotes() {
    let authtoken = sessionStorage.getItem('authtoken')
    if (authtoken == null || authtoken == '') {
      return
    }
    let data = await context.fetchallnotes_APIcall(authtoken)
    context.setNotes(data.data)
  }

  // VARIABLES
  const context = useContext(NoteContext)

  useEffect(() => {
    context.setNotes([])
    fetchNotes()
  }, [])

  // RETURN
  return (
    <div>
      <AddNotes />
      {/* CONDITIONAL RENDERING */}
      {context.Notes.length == 0 ? <div className='text-center m-5'>No notes available</div> : <NotesContainer notes={context.Notes} />}
      {context.display_Editpopup.flag ? <Editpopup note={context.display_Editpopup.note} /> : null}
    </div>
  )
}

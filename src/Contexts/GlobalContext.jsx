import React, { createContext, useState } from 'react'
import { fetchallnotes_APIcall, addnote_APIcall, deleteNote_APIcall, updateNote_APIcall, signup_APIcall, login_APIcall } from './APIcalls'

export const NoteContext = createContext()

export default function GlobalContext(props) {

  function showAlert(msg) {
    setuserAlert({ flag: true, msg: msg })
    AlertAnimationDelay().then(() => { setuserAlert({ flag: false, msg: '' }) })
  }

  function AlertAnimationDelay() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000);
    })
  }

  // STATES
  const [IsLoggedin, setIsLoggedin] = useState(() => {
    let value = sessionStorage.getItem('isLoggedin')
    return value ? JSON.parse(value) : false
  })
  const [username, setusername] = useState(() => {
    return sessionStorage.getItem('email')
  })
  const [Notes, setNotes] = useState([])
  const [Loader, setLoader] = useState(false)
  const [userAlert, setuserAlert] = useState({ flag: false, msg: '' })
  const [display_Editpopup, setdisplay_Editpopup] = useState({ flag: false, note: {} })

  const contextObject = { Notes, display_Editpopup, userAlert, Loader, IsLoggedin, username, setusername, setIsLoggedin, setuserAlert, setLoader, setNotes, setdisplay_Editpopup, fetchallnotes_APIcall, addnote_APIcall, deleteNote_APIcall, updateNote_APIcall, AlertAnimationDelay, signup_APIcall, login_APIcall, showAlert }

  // RETURN
  return (
    <>
      <NoteContext.Provider value={contextObject}>
        {props.children}
      </NoteContext.Provider>
    </>
  )
}

import React, { useContext } from 'react'
import { NoteContext } from '../Contexts/GlobalContext'
import { useNavigate } from 'react-router-dom'

export default function UserAccInfo(props) {
  // FUNCTIONS
  function handleLogout() {
    sessionStorage.setItem('isLoggedin', 'false')
    sessionStorage.setItem('authtoken', '')
    context.setIsLoggedin(false)
    context.showAlert('Signed out successfully')
    navigate('/login')
  }
  // VARIABLES
  const context = useContext(NoteContext)
  const navigate = useNavigate()
  // RETURN
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ userSelect: 'none' }}>
      <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{props.username}</div>
      <div className="userIcon mx-3" style={{ width: '38px', height: '38px', backgroundColor: '#cacaca', borderRadius: '50%', display: 'grid', placeContent: 'center' }}><i className="fa-solid fa-user-large" style={{ fontSize: '22px' }}></i></div>
      <button className="btn btn-outline-light" type="button" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket mx-1"></i></button>
    </div>
  )
}

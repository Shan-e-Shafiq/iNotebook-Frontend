import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function UserAccButtons() {
  // FUNCTIONS
  function handleLogin() {
    login.current.click()
  }
  function handleSignup() {
    signup.current.click()
  }
  // VARIABLES
  const login = useRef()
  const signup = useRef()
  return (
    <div>
      <button className="btn btn-primary mx-2" type="button" onClick={handleLogin}><Link ref={login} to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login <i className="fa-solid fa-right-to-bracket"></i></Link></button>
      <button className="btn btn-success" type="button" onClick={handleSignup}><Link ref={signup} to='/signup' style={{ textDecoration: 'none', color: 'white' }}>Signup <i className="fa-solid fa-user-plus"></i></Link></button>
    </div>
  )
}

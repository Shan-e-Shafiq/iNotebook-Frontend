import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserAccButtons from './UserAccButtons'
import { NoteContext } from '../Contexts/GlobalContext'
import UserAccInfo from './UserAccInfo'

export default function Navbar(props) {

  // VARIABLES
  const context = useContext(NoteContext)

  // RETURN
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${props.pathname == '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${props.pathname == '/about' ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>

            {/* CONDITIONAL RENDERING */}
            {context.IsLoggedin ? <UserAccInfo username={context.username} /> : <UserAccButtons />}

          </div>
        </div>
      </nav>
    </div>
  )
}

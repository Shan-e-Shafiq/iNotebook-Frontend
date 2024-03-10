import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NoteContext } from '../Contexts/GlobalContext'
import Loader from './Loader'
import Alert from './Alert'

export default function LoginComponent() {

  // FUNCTIONS
  async function handleLogin(e) {
    e.preventDefault()
    context.setLoader(true)
    let formdata = new FormData(e.target)
    let userdata = {}
    formdata.forEach((value, key) => {
      userdata[key] = value
    })
    let { email } = userdata
    if (!email.includes('@gmail.com')) {
      context.setLoader(false)
      context.showAlert('Please provide valid credentials')
      return
    }
    let response = await context.login_APIcall(userdata)
    if (response.flag) {
      sessionStorage.setItem('authtoken', response.data.authtoken)
      sessionStorage.setItem('isLoggedin', 'true')
      context.setIsLoggedin(true)
      context.setLoader(false)
      context.showAlert('Welcome to iNotebook')
      sessionStorage.setItem('email', email)
      context.setusername(email)
      navigate('/')
    } else {
      context.setLoader(false)
      context.showAlert(response.data.error)
    }
  }

  // VARIABLES
  const [showPassword, setshowPassword] = useState(false)
  const context = useContext(NoteContext)
  const navigate = useNavigate()

  // RETURN
  return (
    <>
      {/* CONDITIONAL RENDER */}
      {context.Loader ? <Loader /> : null}
      {context.userAlert.flag ? <Alert alert={context.userAlert.msg} /> : null}
      <div className="w-100 d-flex justify-content-center">
        <div className='PageContainer'>
          <div className="PageView">
            <form onSubmit={handleLogin}>
              <h2 className='text-center'>Login</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                <div className="input-group mb-3">
                  <input type={`${showPassword ? 'text' : 'password'}`} className="form-control" aria-label="Username" name='password' aria-describedby="basic-addon1" required={true} />
                  <button className="input-group-text" type='button' id="basic-addon1" onClick={() => { showPassword ? setshowPassword(false) : setshowPassword(true) }} style={{ cursor: 'pointer' }}>{showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</button>
                </div>
              </div>
              <div className='my-3'>Don't have an account? <Link to='/signup' style={{ textDecoration: 'none' }}>Create one</Link></div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

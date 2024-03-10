import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NoteContext } from '../Contexts/GlobalContext'
import Loader from './Loader'
import Alert from './Alert'

export default function SignupComponent() {

  // FUNCTIONS
  async function handleSignup(e) {
    e.preventDefault()
    context.setLoader(true)
    let formdata = new FormData(e.target)
    let userdata = {}
    formdata.forEach((value, key) => {
      userdata[key] = value
    })
    // SOME FORM VALIDATIONS
    // if email in not valid
    let { email, password, confirm_password } = userdata
    if (!email.includes("@gmail.com")) {
      context.setLoader(false)
      context.showAlert('Invalid credentials')
      return
    }
    // if password != confirm_password
    if (password != confirm_password) {
      context.setLoader(false)
      context.showAlert('Password should be same as confirmed password')
      return
    }

    let response = await context.signup_APIcall(userdata)
    if (response.flag) {
      sessionStorage.setItem('authtoken', response.data.authtoken)
      sessionStorage.setItem('isLoggedin', 'true')
      context.setIsLoggedin(true)
      context.setLoader(false)
      sessionStorage.setItem('email', email)
      context.setusername(email)
      context.showAlert('Account created successfully')
      navigate('/')
    } else {
      context.setLoader(false)
      context.showAlert(response.data.error)
    }
  }

  // VARIABLES
  const [showPassword, setshowPassword] = useState(false)
  const context = useContext(NoteContext)
  let navigate = useNavigate()

  // RETURN 
  return (
    <>
      {/* CONDITIONAL RENDER */}
      {context.Loader ? <Loader /> : null}
      {context.userAlert.flag ? <Alert alert={context.userAlert.msg} /> : null}

      <div className="w-100 d-flex justify-content-center">
        <div className='PageContainer'>
          <div className="PageView">
            <form onSubmit={handleSignup}>
              <h2 className='text-center'>Create account</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" name='name' className="form-control" aria-describedby="emailHelp" required={true} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" aria-describedby="emailHelp" required={true} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                <div className="input-group mb-3">
                  <input type={`${showPassword ? 'text' : 'password'}`} className="form-control" aria-label="Username" name='password' aria-describedby="basic-addon1" required={true} />
                  <button className="input-group-text" type='button' id="basic-addon1" onClick={() => { showPassword ? setshowPassword(false) : setshowPassword(true) }} style={{ cursor: 'pointer' }}>{showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Confirm password</label>
                <div className="input-group mb-3">
                  <input type={`${showPassword ? 'text' : 'password'}`} className="form-control" aria-label="Username" name='confirm_password' aria-describedby="basic-addon1" required={true} />
                </div>
              </div>
              <div className='my-3'>Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></div>
              <button type="submit" className="btn btn-primary">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

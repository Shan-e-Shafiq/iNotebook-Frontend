import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import GlobalContext, { NoteContext } from './Contexts/GlobalContext'
import LoginComponent from './Components/LoginComponent'
import SignupComponent from './Components/SignupComponent'
import { useEffect } from 'react'

export default function App() {
  async function Connect_to_API() {
    let response = await fetch("https://i-notebook-backend-gray.vercel.app/")
    let data = response.json()
    return data
  }

  const location = useLocation()
  useEffect(() => {
    Connect_to_API()
  }, [])

  return (
    <>
      <GlobalContext>

        <header><Navbar location={location.pathname}></Navbar></header>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/signup' element={<SignupComponent />} />
          </Routes>

        </div>
      </GlobalContext>
    </>
  )
}


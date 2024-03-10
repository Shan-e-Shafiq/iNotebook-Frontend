import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import GlobalContext from './Contexts/GlobalContext'
import LoginComponent from './Components/LoginComponent'
import SignupComponent from './Components/SignupComponent'

export default function App() {

  const location = useLocation()

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


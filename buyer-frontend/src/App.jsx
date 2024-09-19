//css import
import './app.scss'

//package imports
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'
// component imports
import Nav from './components/nav-bar/Nav'
import Footer from './components/footer/Footer'

//page imports
import Home from './pages/home/Home'
import Listings from './pages/listings/Listings'
import SignUp from './pages/sign-up/SignUp'
import Login from './pages/login/Login'
import SingleListing from './pages/singlelisting/SingleListing'


const App = () => {

  const {user} = useAuthContext()

  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/listings' element={<Listings/>}/>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/:id' element={user ? <SingleListing /> : <Navigate to="/signup" />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

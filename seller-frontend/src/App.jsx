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
import Login from './pages/login/Login'
import AddListingForm from './pages/add-listing/AddListingForm'
import SignUp from './pages/sign-up/SignUp'
import SellerHome from './pages/seller-home/SellerHome'
import SingleListing from './pages/singlelisting/SingleListing'

const App = () => {

  const user = useAuthContext()
  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/add-listing' element={<AddListingForm/>}/>
          <Route path='/seller-home' element={user? <SellerHome/> : <Navigate to="/signup" />}/>
          <Route path='/:id' element={<SingleListing/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
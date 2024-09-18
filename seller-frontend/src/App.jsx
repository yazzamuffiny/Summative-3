//css import
import './app.scss'

//package imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// component imports
import Nav from './components/nav-bar/Nav'
import Footer from './components/footer/Footer'

//page imports
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import AddListingForm from './pages/add-listing/AddListingForm'
import SignUp from './pages/sign-up/SignUp'
import SellerHome from './pages/seller-home/SellerHome'
import Listings from './pages/listings/Listings'
import SingleListing from './pages/singlelisting/SingleListing'
import EditListingForm from './pages/edit-listing/EditListingForm'

const App = () => {
  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          {<Route exact path='/signup' element={<SignUp/>}></Route>
          <Route eaxct path='/login' element={<Login/>}></Route>}
          <Route exact path='/add-listing' element={<AddListingForm/>}/>
          <Route path='/seller-home' element={<SellerHome/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/listings' element={<Listings/>}/>
          <Route path='/:id' element={<SingleListing/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

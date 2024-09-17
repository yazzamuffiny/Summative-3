//css import
import './app.scss'

//package imports
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// component imports
import Nav from './components/nav-bar/Nav'
import Footer from './components/footer/Footer'

//page imports
import Home from './pages/home/Home'
import Listings from './pages/listings/Listings'
import SignUp from './pages/sign-up/SignUp'
import SingleListing from './pages/singlelisting/SingleListing'

const App = () => {
  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/listings' element={<Listings/>}/>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/:id' element={<SingleListing/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

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

const App = () => {
  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/listings' element={<Listings/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

//css import
import './app.scss'

//package imports
import { HashRouter, Route, Routes } from 'react-router-dom'

// component imports
import Nav from './components/nav-bar/Nav'
import Footer from './components/footer/Footer'

//page imports
import Home from './pages/home/Home'
import AddListingForm from './pages/add-listing/AddListingForm'
import EditListingForm from './pages/edit-listing/EditListingForm'

const App = () => {
  return (
    <HashRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/add-listing' element={<AddListingForm/>}/>
          <Route exact path='/edit-listing' element={<EditListingForm/>}/>
        </Routes>
      <Footer/>
    </HashRouter>
  )
}

export default App

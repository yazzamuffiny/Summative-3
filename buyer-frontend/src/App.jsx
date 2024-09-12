//css import
import './app.scss'

//package imports
import { HashRouter, Route, Routes } from 'react-router-dom'

// component imports
import Nav from './components/nav-bar/Nav'
import Footer from './components/footer/Footer'

//page imports
import Home from './pages/home/Home'

const App = () => {
  return (
    <HashRouter>
      <Nav/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      <Footer/>
    </HashRouter>
  )
}

export default App

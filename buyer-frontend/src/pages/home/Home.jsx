// home scss import
import './home.scss'

// import useNavigate
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  
    //to log in page
  const NavigateLogIn = async (e) => {
    e.preventDefault()
    navigate(`/login`)
  }

  //to sign up page
  const NavigateSignUp = async (e) => {
    e.preventDefault()
    navigate(`/signup`)
  }

  //to listings page
  const navigateListings = async (e) => {
    e.preventDefault()
    navigate(`/listings`)
  }

  return (
    <>
      <div className='home-page-main-box'>
        <div className='home-page-box'>
          {/* home left side box */}
          <div className='home-left-content-box'>

            {/* home header box */}
            <div className='home-header-box'>
              <h1 className='main-header'>PawMatch</h1>
              <img className='pawmatch-green-logo' src="src/images/green-pawprint.svg" alt="placeholder" />
            </div>

            {/* home text & btns box */}
            <div className='home-content-box'>
              {/* home text */}
              <div className='home-text-box'>
                Welcome to PawMatch, your go to destination for finding pedigree dogs in New Zealand. PawMatch helps you connect with your perfect furry match. Start your journey to dog ownership today!
              </div>
              {/* home btns box */}
              <div className='home-btns-box'>
                <button className='go-to-sign-up-btn' onClick={NavigateSignUp}>Sign Up</button>
                <button className='go-to-log-in-btn' onClick={NavigateLogIn}>Log In</button>
                <button className='go-to-listings' onClick={navigateListings}>Skip</button>
              </div>
            </div>
          </div>

          {/* home right side box */}
          <div className='home-right-content-box'>
            {/* home logo box */}
            <div className='home-logo-box'>
              <img src="src/images/dog-gif.gif" alt="pawmatch logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

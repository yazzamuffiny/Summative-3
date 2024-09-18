// home scss import
import './home.scss'

// import useNavigate
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  

  const NavigateLogIn = async (e) => {
    e.preventDefault()
    console.log('log in btn is clicked')
    navigate(`/login`)
  }

  const NavigateSignUp = async (e) => {
    e.preventDefault()
    console.log('sign up btn is clicked')
    navigate(`/signup`)
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
              <img className='pawmatch-green-logo' src="https://placehold.co/100" alt="placeholder" />
            </div>

            {/* home text & btns box */}
            <div className='home-content-box'>
              {/* home text */}
              <div className='home-text-box'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quam incidunt adipisci illum fugit veniam quos aliquid eaque pariatur.
              </div>
              {/* home btns box */}
              <div className='home-btns-box'>
                <button id='go-to-sign-up-btn' onClick={NavigateSignUp}>Sign Up</button>
                <button id='go-to-log-in-btn' onClick={NavigateLogIn}>Log In</button>
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

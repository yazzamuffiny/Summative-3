import React from 'react'
// home scss import
import './home.scss'

const Home = () => {
  const goToLogIn = async (e) => {
    e.preventDefault()
    console.log('log in btn is clicked')
  }

  const goToSignUp = async (e) => {
    e.preventDefault()
    console.log('sign up btn is clicked')
    
  }

  return (
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quam incidunt adipisci illum fugit veniam quos aliquid eaque pariatur, exercitationem recusandae dolore ipsam, sapiente nemo asperiores. Totam fuga laudantium eum?
          </div>
          {/* home btns box */}
          <div className='home-btns-box'>
            <button id='go-to-sign-up-btn' onClick={goToSignUp}>Sign Up</button>
            <button id='go-to-log-in-btn' onClick={goToLogIn}>Log In</button>
          </div>
        </div>
      </div>

      {/* home right side box */}
      <div className='home-right-content-box'>
        {/* home logo box */}
        <div className='home-logo-box'>
          <img src="https://placehold.co/200" alt="placeholder image" />
        </div>
      </div>

    </div>
  )
}

export default Home

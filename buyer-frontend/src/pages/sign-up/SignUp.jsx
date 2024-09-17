// import useState
import { useState } from 'react'

// import signup hook
import { useSignup } from '/src/hooks/useSignup'

// import useNavigate
import {useNavigate} from 'react-router-dom'

// import signup css
import './signup.scss'

const SignUp = () => {
    // navigate
    const navigate = useNavigate()

    // signup state values
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    // submit signup btn function
    const signUpSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
        navigate(`/listings`)
    }

  return (
    <>
        {/* signup page main box */}
        <div className='signup-page-box'>

            {/* signup left content box */}
            <div className='signup-left-content-box'>

                {/* header box w/ logo  */}
                <div className='header-box'>
                    <h1 className='main-header'>PawMatch</h1>
                    <img className='pawmatch-green-logo' src="src/images/green-pawprint.svg" alt="placeholder" />
                </div>

                {/* signup form box */}
                <form id='signup-form-box' onSubmit={signUpSubmit}>
                    <h3 className='signup-subheader'>Sign Up</h3>

                    {/* signup fields & label box */}
                    <div className='signup-fields-box'>
                        {/* signup field & label */}
                        <label className='form-label'>Email Address:</label>
                        <input 
                            className='form-field' 
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        {/* signup field & label */}
                        <label className='form-label'>Password:</label>
                        <input 
                            className='form-field' 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        {error && <div className='error'>{error}</div>}

                        {/* signup btn box */}
                        <div className='signup-btn-box'>
                            <button 
                                id='signup-btn' 
                                onClick={signUpSubmit}
                                disabled={isLoading}
                                >Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* signup right content box */}
            <div className='signup-right-content-box'>
                <div className='logo-box'>
                <img src="src/images/logo-no-bg.png" alt="pawmatch logo" />
                </div>
            </div>

        </div>
    </>
  )
}

export default SignUp

// import useState
import { useState } from 'react'

// import login hook
import { useLogin } from '/src/hooks/useLogin'

// import login css
import './login.scss'

const Login = () => {

  // login state values 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isLoading, error} = useLogin()

  // submit login btn function
  const loginSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div>
      {/* login page main box */}
        <div className='login-page-box'>

            {/* login left content box */}
            <div className='login-left-content-box'>

                {/* header box w/ logo  */}
                <div className='header-box'>
                    <h1 className='main-header'>PawMatch</h1>
                    <img className='pawmatch-green-logo' src="src/images/green-pawprint.svg" alt="placeholder" />
                </div>

                {/* login form box */}
                <form id='login-form-box' onSubmit={loginSubmit}>
                    <h3 className='login-subheader'>Log In</h3>

                    {/* login fields & label box */}
                    <div className='login-fields-box'>
                        {/* login field & label */}
                        <label className='form-label'>Email Address:</label>
                        <input 
                            className='form-field' 
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        {/* login field & label */}
                        <label className='form-label'>Password:</label>
                        <input 
                            className='form-field' 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        {error && <div className='error'>{error}</div>}

                        {/* login btn box */}
                        <div className='login-btn-box'>
                            <button 
                                id='login-btn' 
                                onClick={loginSubmit}
                                disabled={isLoading}
                                >Log In
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* login right content box */}
            <div className='login-right-content-box'>
                <div className='logo-box'>
                <img src="src/images/logo-no-bg.png" alt="pawmatch logo" />
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login

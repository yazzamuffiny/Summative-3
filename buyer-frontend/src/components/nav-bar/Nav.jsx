import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import './nav.scss'

const Nav = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleLogout = () => {
    logout();
  }

  return (
    <div className='navbar'>

      <div className='logo'>
        <img src="src/images/logo-no-bg.png" alt="website logo"/>
      </div>

      {/* change this to the login signup buttons */}
      <div className='logged-user'>
        {user && <div className="userInt">
          <span>{user.email}</span>
          <button onClick={handleLogout}> Logout </button>
          </div>}
      </div>
    </div>
  )
}

export default Nav

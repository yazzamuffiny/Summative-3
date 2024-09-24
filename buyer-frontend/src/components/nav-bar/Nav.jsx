//stylesheet import
import './nav.scss'

//import hooks
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

//package imports
import { useNavigate } from 'react-router-dom';



const Nav = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }

  return (
    <div className='navbar'>

      <div className='logo' >
        <img src="src/images/logo-no-bg.png" alt="website logo" onClick={navigateHome}/>
      </div>

      {/* change this to the login signup buttons */}
      <div className='logged-user'>
        {user && <div className="userInt">
          <span>{user.email ? getEmailCharactersBeforeAtSymbol(user.email) : 'Unknown'}</span>
          <button className='logout-btn' onClick={handleLogout}> Logout </button>
        </div>}
      </div>
    </div>
  )
}

export default Nav

//css imports
import './nav.scss'

//hook imports
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

//package imprts
import { useNavigate } from 'react-router-dom';

const Nav = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();
  const navigate = useNavigate();

  //handle logout function
  const handleLogout = () => {
    logout();
    navigate('/');
  }

  //navigate to home
  const navigateHome = () => {
    navigate('/')
  }

  //chop email from user
  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }

  return (
    <div className='navbar'>

      <div className='logo'>
        <img src="src/images/logo-no-bg.png" alt="website logo" onClick={navigateHome}/>
      </div>

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

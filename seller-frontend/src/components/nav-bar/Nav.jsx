import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import './nav.scss'
import { useNavigate } from 'react-router-dom';

const Nav = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='navbar'>

      <div className='logo'>
        <img src="src/images/logo-no-bg.png" alt="website logo"/>
      </div>

      <div className='logged-user'>
        {user && <div className="userInt">
          <span>{user.email}</span>
          <button className='logout-btn' onClick={handleLogout}> Logout </button>
          </div>}
      </div>
    </div>
  )
}

export default Nav

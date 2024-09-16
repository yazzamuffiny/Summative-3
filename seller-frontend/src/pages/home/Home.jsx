import { useNavigate } from 'react-router-dom'
import './seller-home.scss'


const Home = () => {
  const navigate = useNavigate()


  const handleAdd = (e) => {
    let path = '/add-listing'
    navigate(path);
  }

  const handleEdit = (e) => {
    let path = '/edit-listing'
    navigate(path);
  }

  return (
    <div className='seller-home'>
      <div className='page-title'>
      <h1> Local Listings </h1>
      </div>

      <button onClick={handleAdd}> add listing </button>
      <button onClick={handleEdit}> edit listing </button>
      {/* container w/ filters and create section & listings */}
    </div>
  )
}

export default Home

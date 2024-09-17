import './edit-listing.scss'
import { useNavigate } from 'react-router-dom';

const editListingForm = () => {

  const navigate = useNavigate();

  return (
    <div className='edit-listing-page'>

      {/* back button and title */}
      <div className='backbtn-title'>
      <button onClick={() => navigate(-1)} className='back-button'> Back </button>
      <h1> Edit Listing </h1>
      </div>

      {/* form will be here */}
    </div>
  )
}

export default editListingForm

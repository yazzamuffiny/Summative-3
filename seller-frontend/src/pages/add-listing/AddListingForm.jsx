import { useNavigate } from "react-router-dom"
import './add-listing.scss'

const addListingForm = () => {
const navigate = useNavigate();

  return (
    <div className='add-listing-page'>
      <div className='backbtn-title'>
      <button onClick={() => navigate(-1)} className='back-button'> Back </button>
      <h2> Add New Listing </h2>
      </div>
    </div>
  )
}

export default addListingForm

import './edit-listing.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useListingsContext } from '../../hooks/useListingsContext';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const EditListingForm = () => {
  const { dispatch } = useListingsContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [editBreed, setEditBreed] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editSize, setEditSize] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editInfo, setEditInfo] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/listings/${id}`);
        console.log(response.data);
        setListing(response.data);
        setEditBreed(listing.breed);
        setEditAge(listing.age);
        setEditSize(listing.size);
        setEditNumber(listing.number_available);
        setEditLocation(listing.location);
        setEditInfo(listing.additional_info);
        setEditGender(listing.gender);
        setEditPrice(listing.price);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const updatedListing = {
        breed: editBreed,
        age: editAge,
        size: editSize,
        number: editNumber,
        location: editLocation,
        info: editInfo,
        gender: editGender,
        price: editPrice
      };

      const response = await axios.patch(`${baseURL}/api/listings/${listing._id}`, updatedListing);
      const json = await response.data;

      if (response.status === 200) {
        dispatch({ type: 'UPDATE_LISTING', payload: json });
        navigate('/listings');
      }
    } catch (error) {
      setError('Failed to update the listing.');
      console.error("Error updating listing:", error);
    }
  };

  // if (!listing) return <div>Loading...</div>;

  return (
    <div className='edit-listing-page'>
      <div className='backbtn-title'>
        <button onClick={() => navigate(-1)} className='back-button'>Back</button>
        <h1>Edit Listing</h1>
      </div>

      <form className="add-listing-form" onSubmit={handleUpdate}>
        <h2>Your Dog's Information:</h2>
        <div className="input-grid">
          <div className="form-input">
            <label htmlFor="breed">Breed Name:</label>
            <input 
              type="text" 
              onChange={(e) => setEditBreed(e.target.value)}
              value={editBreed}
              placeholder={listing.breed}
            />
          </div>

          <div className="form-input">
            <label htmlFor="age">Age:</label>
            <select name="age" id="age" onChange={(e) => setEditAge(e.target.value)} value={editAge}>
              <option value=''>Please Select</option>
              <option value='baby'>2 months - 6 months</option>
              <option value='puppy'>6 months - 1 year</option>
              <option value='teen'>1 - 2 years</option>
              <option value='youngAdult'>2 - 5 years</option>
              <option value='adult'>5 - 10 years</option>
              <option value='senior'>10+ years</option>
            </select>
          </div>

          <div className="form-input">
            <label htmlFor="gender">Gender:</label>
            <select name="gender" id="gender" onChange={(e) => setEditGender(e.target.value)} value={editGender}>
              <option value=''>Please Select...</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='mixed'>Mixed</option>
            </select>
          </div>

          <div className="form-input">
            <label htmlFor="size">Dog Size:</label>
            <select name="size" id="size" onChange={(e) => setEditSize(e.target.value)} value={editSize}>
              <option value="">Please Select...</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="form-input">
            <label htmlFor="number">Number Available:</label>
            <input 
              type="number"
              onChange={(e) => setEditNumber(e.target.value)}
              value={editNumber}
            />
          </div>

          <div className="form-input">
            <label htmlFor="location">Location:</label>
            <select name="location" id="location" onChange={(e) => setEditLocation(e.target.value)} value={editLocation}>
              <option value=''>Please Select</option>
              <option value='northland'>Northland</option>
              <option value='auckland'>Auckland</option>
              <option value='waikato'>Waikato</option>
              <option value='bayOfPlenty'>Bay of Plenty</option>
              <option value='gisbourne'>Gisbourne</option>
              <option value='hawkesBay'>Hawkes Bay</option>
              <option value='taranaki'>Taranaki</option>
              <option value='manawatuWhanganui'>Manawatū-Whanganui</option>
              <option value='wellington'>Wellington</option>
              <option value='tasman'>Tasman</option>
              <option value='nelson'>Nelson</option>
              <option value='marlborough'>Marlborough</option>
              <option value='westCoast'>West Coast</option>
              <option value='canterbury'>Canterbury</option>
              <option value='otago'>Otago</option>
              <option value='southland'>Southland</option>
            </select>
          </div>
        </div>

        <h2>Listing Information:</h2>
        <div className="input-grid">
          <div className="form-input">
            <label htmlFor="price">Price:</label>
            <input 
              type="text" 
              onChange={(e) => setEditPrice(e.target.value)}
              value={editPrice}
            />
          </div>

          <div className="form-input">
            <label htmlFor="image">Image Upload:</label>
            <input 
              type="file" 
              accept='image/*' 
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="form-input">
            <label htmlFor="info">Further Information:</label>
            <input 
              type="text"
              onChange={(e) => setEditInfo(e.target.value)}
              value={editInfo}
              placeholder="Max 100 Characters"
              maxLength={100}
            />
          </div>
        </div>

        <button type="submit">Update Listing</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default EditListingForm;

import '../listingdetails/listing-details.scss';
import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';

const ListingDetails = ({ listing }) => {
  const navigate = useNavigate();

  // Handle navigation to the detail page of the listing
  const handleNavigate = () => {
    let path = `/${listing._id}`
    navigate(path);
  };

  const baseURL = import.meta.env.VITE_API_BASE_URL

  return (
    <div className='listing-card' onClick={handleNavigate}>
      <div className='card-img'>
      <img src={`${baseURL}/public/uploads/${listing.image}`} alt="photo of listing here" />      
      </div>
      <div className='card-info'>
        <h3>{listing.breed}</h3>
        <h4>{listing.user_id}</h4>
        <div className='card-tags'>
          <p className='gender-tag'>{listing.gender}</p>
          <p className='age-tag'>{listing.age}</p>
          <p className='available-tag'>{listing.number_available}</p>
        </div>
        <p className='date'>
          Created&nbsp;
          {formatDistanceToNow(new Date(listing.createdAt), {
            includeSeconds: true,
          })}{' '}
          ago
        </p>
      </div>
    </div>
  );
};

export default ListingDetails;
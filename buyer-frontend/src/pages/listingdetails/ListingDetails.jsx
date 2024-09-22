import './listingdetails.scss';
import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL


const ListingDetails = ({ listing }) => {
  const navigate = useNavigate();

  // Handle navigation to the detail page of the listing
  const handleNavigate = () => {
    navigate(`/${listing._id}`);
  };

  return (
    <div className='listing-card' onClick={handleNavigate}>
      <div className='card-img'>
        <img src={`${baseURL}/public/uploads/${listing.image}`} alt={`Image of ${listing.breed}`} />
      </div>
      <div className='card-info'>
        <h3>{listing.breed}</h3>
        <h4>{listing.user_id}</h4>
        <div className='card-tags'>
          <p className='gender-tag'>{listing.gender.toUpperCase()}</p>
          <p className='age-tag'>{listing.age.toUpperCase()}</p>
          <p className='available-tag'>{listing.number_available.toUpperCase()}</p>
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
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

  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }

  return (
    <div className='listing-card' onClick={handleNavigate}>
      <div className='card-img'>
        <img src={`${baseURL}/public/uploads/${listing.image}`} alt={`Image of ${listing.breed}`} />
      </div>
      <div className='card-info'>
        <h3>{listing.breed}</h3>
        <h4>{listing.user_id ? getEmailCharactersBeforeAtSymbol(listing.user_id) : 'Unknown'}</h4>
        <div className='card-tags'>
          <p className='gender-tag'>Gender: {listing.gender.toUpperCase()}</p>
          <p className='age-tag'>Age: {listing.age.toUpperCase()}</p>
          <p className='available-tag'>Number Available: {listing.number_available.toUpperCase()}</p>
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
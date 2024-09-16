import React from 'react'

import { useNavigate } from 'react-router-dom'

const ListingDetails = ({listing}) => {

  const navigate = useNavigate()
  //handle navigate
  const handleNavigate = () => {
    let path = `/${listing._id}`
    navigate(path)
}

  return (
    <div className='listing-card' onClick={handleNavigate}>
        <p>{listing.breed}</p>
      
    </div>
  )
}

export default ListingDetails

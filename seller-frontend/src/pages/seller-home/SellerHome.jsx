// css import
import './seller-home.scss'

//react imports
import { useEffect, useState } from 'react'

//package imports
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//page imports
import ListingDetails from '../listingdetails/ListingDetails'

//base url imports
const baseURL = import.meta.env.VITE_API_BASE_URL


const Home = () => {
// DEFINITION OF VARIABLES
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [ searchedListings, setSearchedListings ] = useState([])
  const [showMyListings, setShowMyListings] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ age, setAge ] = useState('')
  const [ size, setSize ] = useState('')
  const [ location, setLocation ] = useState('')

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;

//   FUNCTIONS
//add listing navigate
  const handleAdd = () => {
    navigate('/add-listing');
  };

  //show my listings filter
  const handleShowMyListings = () => {
    setShowMyListings(true);
  };

  //show all listings filter
  const handleShowAllListings = () => {
    setShowMyListings(false);
  };

  //clear filters function
  const handleClearFilters = () => {
    setSearchTerm('');
    setGender('');
    setAge('');
    setSize('');
    setLocation('');
};

//get all listings
    useEffect (() => {
      const fetchListings = async () => {
          try {
              const response = await axios.get(`${baseURL}/api/listings/`)
              const listingsData = response.data
              setListings(listingsData)
              setSearchedListings(listingsData)
  
          } catch (error) {
              console.log(error)
          }
      }
      fetchListings()
     
  }, [])

  //filter listings
  useEffect(() => {
    const filteredListings = listings
        .filter(listing => 
            (showMyListings ? listing.user_id === userId : true))
        .filter(listing => 
            listing.breed.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(listing => 
            (gender ? listing.gender === gender : true)
        )
        .filter(listing => 
            (age ? listing.age === age : true)
        )
        .filter(listing => 
            (size ? listing.size === size : true)
        )
        .filter(listing => 
            (location ? listing.location === location : true)
        )
    setSearchedListings(filteredListings)
}, [showMyListings, searchTerm, gender, age, size, location, listings, userId]);


  return (
    <div className='seller-home'>
      <div className='page-title'>
        <h1> Local Listings </h1>
      </div>

      <div className='filter-listing-cont'>
        <div className='create-filter-search-box'>
          {/* create and filter box */}
         <div className='create-and-filter-box'>
          <h2> Create & Filter </h2>
          <button onClick={handleAdd}> + Add a Listing </button>
          <button onClick={handleShowMyListings}> My Listings </button>
          <button onClick={handleShowAllListings}> All Listings </button>
        </div>

        <div className='form-box'>
            {/* search box */}
            <div className='search-box'>
                <label htmlFor='search'>Search Breed:</label>
                <input 
                    type='text' 
                    name='search'
                    id='search'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
            {/* filters box */}
            <div className='filter-box'>
                {/* gender filter */}
                <label htmlFor='gender'>Gender:</label>
                <select 
                    name="gender" 
                    id="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                >
                    <option value=''>Please Select</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='mixed'>Mixed</option>
                </select>
                {/* age filter */}
                <label htmlFor='age'>Age:</label>
                <select 
                    name="age" 
                    id="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                >
                    <option value=''>Please Select</option>
                    <option value='baby'>2 months - 6 months</option>
                    <option value='puppy'>6 month - 1 year</option>
                    <option value='teen'>1 - 2 years</option>
                    <option value='youngAdult'>2 - 5 years</option>
                    <option value='adult'>5 - 10 years</option>
                    <option value='senior'>10+ years</option>
                </select>
                {/* size filter */}
                <label htmlFor='size'>Size:</label>
                <select 
                    name="size" 
                    id="size"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                >
                    <option value=''>Please Select</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='xlarge'>Extra Large</option>
                </select>
                {/* location filter */}
                <label htmlFor='location'>Location:</label>
                <select 
                    name="location" 
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                >
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
                <div className='filter-buttons'>
              <button onClick={handleClearFilters}> Clear Filters </button>
            </div>
            </div>
        </div>

        </div>

        <div className='listings-display'>
       

{showMyListings ? (listings && listings.map((listing) => {
                    const user = JSON.parse(localStorage.getItem('user'))
                    const user_id = user.email
                    if (listing.user_id === user_id) {
                        return (
                            <ListingDetails key={listing._id} listing={listing}/>
                        )
                    }
                })) : (searchedListings.map((listing) => {
                    return (
                        <ListingDetails key={listing._id} listing={listing}/>
                    )
                })
            )}
        </div>

      </div>

    </div>
  )
}

export default Home
// css import
import './listings.scss'

//react imports
import { useEffect, useState } from 'react'

// package imports
import axios from 'axios'

//page imports
import ListingDetails from '../listingdetails/ListingDetails'

//base url import
const baseURL = import.meta.env.VITE_API_BASE_URL

const Listings = () => {

    const [listings, setListings] = useState([])
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ age, setAge ] = useState('')
    const [ size, setSize ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ searchedListings, setSearchedListings ] = useState([])
    

    //clear search & filters
    const handleClearFilters = () => {
        setSearchTerm('');
        setGender('');
        setAge('');
        setSize('');
        setLocation('');
    };
   
    //basic get all listings
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

    //filter all the listings
    useEffect(() => {
        const filteredListings = listings
            .filter(listing => 
                listing.breed.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(listing => 
                (gender ? listing.gender.toLowerCase() === gender.toLowerCase() : true)
            )
            .filter(listing => 
                (age ? listing.age.toLowerCase() === age.toLowerCase() : true)
            )
            .filter(listing => 
                (size ? listing.size.toLowerCase() === size.toLowerCase() : true)
            )
            .filter(listing => 
                (location ? listing.location.toLowerCase() === location.toLowerCase() : true)
            )
        setSearchedListings(filteredListings)
    }, [searchTerm, gender, age, size, location, listings])


  return (
    <div className='listings-page'>
        
        <div className='page-header'>
            <h3>Local Listings</h3>
        </div>
        <div className='listing-box'>
            <div className='form-box'>
                <div className='search-box'>
                    <label className='search-header'htmlFor='search'>Search Breed:</label>
                    <input 
                        type='text' 
                        name='search'
                        id='search'
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
            <div className='filter-box'>
                <h3 className='search-header'>Filters:</h3>
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
                    <option value='puppy'>Puppy</option>
                    <option value='junior'>Junior</option>
                    <option value='adult'>Adult</option>
                    <option value='mature'>Mature</option>
                    <option value='senior'>Senior</option>
                    
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
                {/* size filter */}
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

                <button onClick={handleClearFilters}> Clear Filters </button>
            </div>
            </div>

            <div className='listings-display'>
                {searchedListings.map((listing) => (
                        <ListingDetails key={listing._id} listing={listing} />
                    ))}
            </div>
        </div>    
    </div>
  )
}

export default Listings

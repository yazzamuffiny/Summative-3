import './singlelisting.scss';

import { useState, useEffect } from 'react';

import { useListingsContext } from '../../hooks/useListingsContext';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTrashCan } from 'react-icons/fa6';
import { FaPenToSquare } from 'react-icons/fa6';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SingleListing = () => {

    const navigate = useNavigate()

    const {dispatch} = useListingsContext()
    
    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)
  
    const [commentText, setCommentText] = useState('')
    const [ isEditing, setIsEditing] = useState(false)

    const [editBreed, setEditBreed] = useState('')
    const [editGender, setEditGender] = useState('')
    const [editAge, setEditAge] = useState('')
    const [editSize, setEditSize] = useState('')
    const [editLocation, setEditLocation] = useState('')
    const [editNumber, setEditNumber] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editInfo, setEditInfo] = useState('')
       
  
    const user = JSON.parse(localStorage.getItem('user'))
    const user_id = user.email


    const logged_user = user.email

    const { id } = useParams()


    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/listings/${id}`);
                console.log(user)
                setListing(response.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching listing:", error);
            }
        };
        fetchListing();
    }, [id]);


   const handleEditState = () => {
        setIsEditing(true)
        
        setEditBreed(listing.breed)
        setEditGender(listing.gender)
        setEditAge(listing.age)
        setEditSize(listing.size)
        setEditLocation(listing.location)
        setEditNumber(listing.number_available)
        setEditPrice(listing.price)
        setEditInfo(listing.additional_info)
   }

   const handleSubmitEdit = async () => {
    const updatedListing = {
        breed: editBreed,
        gender: editGender,
        age: editAge,
        size: editSize,
        location: editLocation,
        number_available: editNumber,
        price: editPrice,
        additional_info: editInfo
    }
    try {
        const response = await axios.patch(`${baseURL}/api/listings/${listing._id}`, updatedListing);
        const updatedData = response.data
       
        if (response.status === 200) {
            dispatch({type: 'UPDATE_PROJECT', payload: updatedData})
            setIsEditing(false)
            navigate(-1);
        }
    } catch (error) {
        console.log('error updating listing', error)
    }
   };

   const handleCancelEdit = () => {
        setEditBreed(listing.breed)
        setEditGender(listing.gender)
        setEditAge(listing.age)
        setEditSize(listing.size)
        setEditLocation(listing.location)
        setEditNumber(listing.number_available)
        setEditPrice(listing.price)
        setEditInfo(listing.additional_info)

        setIsEditing(false)
   }

    const handleDelete = async () => {
        const response = await axios.delete(`${baseURL}/api/listings/${listing._id}`)
        const json = await response.data
        if(response.status === 200) {
            dispatch({type: 'DELETE_LISTING', payload: json})
            navigate(-1)
        }
}

const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }


    const handleBack = () => {
        navigate(-1);
    };
  
    const handleAddComment = async () => {
      try {
          const response = await axios.post(
              `http://localhost:4000/api/comments/listings/${listing._id}/comments`,
              {
                  text: commentText,
                  user_id: logged_user,
              }
          );
  
          if (response.status === 201) {
              const newComment = response.data;
              const updatedComments = [...listing.comments, newComment];
              const updatedListing = { ...listing, comments: updatedComments };
  
              dispatch({ type: 'UPDATE_LISTING', payload: updatedListing });
  
              setCommentText('');
          }
      } catch (error) {
          console.error('Error Adding Comment: ', error);
      }
  };

  if (loading) {
    return (
        <p>Loading</p>
    )
  }

  return (
    <div className='single-listing-page'>
        {isEditing ? (
            <>
                <h1 className='edit-title'>Edit Listing</h1>
                <div className='form-edit-page'>
                    <h2>Your Dog's Information:</h2>
                    <div className='dog-form-info-edit'>
                        <div className='form-column'>
                            <label htmlFor='breed'>Edit Breed:</label>
                            <input 
                                type='text' 
                                value={editBreed}
                                onChange={(e) => setEditBreed(e.target.value)}
                            />
                            <label htmlFor='size'>Edit Size:</label>
                            <select 
                                name='size'
                                id='size' 
                                value={editSize}
                                onChange={(e) => setEditSize(e.target.value)} 
                            >
                                <option value='small'>Small</option>
                                <option value='medium'>Medium</option>
                                <option value='large'>Large</option>
                                <option value='xlarge'>Extra Large</option>
                            </select>
                        </div>
                        <div className='form-column'>
                            <label htmlFor='age'>Edit Age:</label>
                            <select 
                                name='age' 
                                id='age' 
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)} 
                            >
                                <option value='puppy'>Puppy</option>
                                <option value='junior'>Junior</option>
                                <option value='adult'>Adult</option>
                                <option value='mature'>Mature</option>
                                <option value='senior'>Senior</option>
                            </select>
                            <label htmlFor='number'>Edit Number Available:</label>
                            <input 
                                type='text' 
                                value={editNumber}
                                onChange={(e) => setEditNumber(e.target.value)}
                            />
                        </div>
                        <div className='form-column'>
                            <label htmlFor='gender'>Edit Gender:</label>
                            <select
                                name='gender' 
                                id="gender" 
                                value={editGender}
                                onChange={(e) => setEditGender(e.target.value)} 
                            >
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='mixed'>Mixed</option>
                            </select>
                            <label htmlFor='location'>Edit Location:</label>
                            <select 
                                name='location'
                                id='location'
                                value={editLocation}
                                onChange={(e) => setEditLocation(e.target.value)}
                            >
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
                    <div className='listing-form-edit-info'>
                        <div className='form-column'>
                            <label htmlFor='price'>Edit Price:</label>
                            <input 
                                type='text' 
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </div>
                        <div className='form-column'>
                            <label htmlFor='info'>Edit Additional Info:</label>
                            <input 
                                type='text' 
                                value={editInfo}
                                onChange={(e) => setEditInfo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-button-container'>
                        <button onClick={handleCancelEdit}>Cancel Changes</button>
                        <button onClick={handleSubmitEdit}>Save Changes</button>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className='single-page-top'>
                    <div className='single-listing-back-btn' onClick={handleBack}>
                        <FaChevronLeft /> Back
                    </div>
                    <div className='single-listing-header'>
                        <h2>{listing.breed}</h2>
                    </div>
                    <div className='placeholder'></div>

                    
                        {listing.user_id === user_id && (
                            <div className='single-listing-back-btn' onClick={handleEditState}>
                        Edit Listing </div>
                        )}
                </div>
                <div className='single-page-img'>
                    <img src={`${baseURL}/public/uploads/${listing.image}`} alt="photo of listing here" />      
                </div>
                <div className='single-page-info'>
                    <div className='listing-info'>
                        {listing.user_id === logged_user && (
                            <>
                                <div className='edit-delete'>
                                    <FaPenToSquare className='edit' onClick={handleEditState}/>
                                    <FaTrashCan className='delete' onClick={handleDelete}/>
                                </div>
                            </>
                        )}
                        <h3>{listing.breed}</h3>
                        <div className='listing-tags'>
                            <p className='gender-tag'>Gender: {listing.gender.toUpperCase()}</p>
                            <p className='age-tag'>Age: {listing.age.toUpperCase()}</p>
                            <p className='available-tag'>Number Available: {listing.number_available.toUpperCase()}</p>
                            <p className='price-tag'>Price: ${listing.price.toUpperCase()}</p>
                            <p className='size-tag'>Size: {listing.size.toUpperCase()}</p>
                            <p className='location-tag'>Location: {listing.location.toUpperCase()}</p>
                        </div>
                        <h4>Further Information</h4>
                        <p className='additional-info'>{listing.additional_info}</p>
                        <p className='date'>
                            Created {formatDistanceToNow(new Date(listing.createdAt), { includeSeconds: true })} ago
                        </p>
                    </div>
                    <div className='seller-info'>
                        <h3>{listing.user_id}</h3>
                        <button>Contact Now</button>
                    </div>
                </div>
                <div className='comments-box'>
                    <h2>Questions</h2>
                    <div className='add-comment'>
                        <p>Ask a Question</p>
                        <input
                            type='text'
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Type Here..."
                        />
                        <button onClick={handleAddComment}><FaArrowRightLong /></button>
                    </div>
                    <div className='comments-list'>
                        {listing.comments.map(comment => (
                            <div key={comment._id} className='comment'>
                        <h3>{comment.user_id ? getEmailCharactersBeforeAtSymbol(comment.user_id) : 'Unknown'}</h3>
                        <p className='comment-text'>{comment.text}</p>
                                <p className='comment-date'>
                                    {formatDistanceToNow(new Date(comment.createdAt), { includeSeconds: true })} ago
                                </p>
                            </div>
                        ))}     
                    </div>
                </div>
            </>
        )}
    </div>
);
};

export default SingleListing
//import css
import './singlelisting.scss';

//react imports
import { useState, useEffect } from 'react';

//package imports
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

//icon imports
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

//base url import
const baseURL = import.meta.env.VITE_API_BASE_URL;

const SingleListing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState('');

    const user = JSON.parse(localStorage.getItem('user'))

    const { id } = useParams();
    const navigate = useNavigate();

    //chop email off user
    const getEmailCharactersBeforeAtSymbol = (email) => {
        const delimiter = '@';
        const parts = email.split(delimiter);
        return parts.length > 1 ? parts[0]: '';
      }

// add comment function
    const handleAddComment = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/comments/listings/${listing._id}/comments`, 
                {
                    text: commentText,
                    user_id: user.email,
                }
            )

            const newComment = response.data;
            setListing(prevListing => ({
                ...prevListing,
                comments: [...prevListing.comments, newComment]
            }));

            setCommentText('');
        } catch (err) {
            console.error("Failed to add comment", err)
        }
    }

//get listing by id
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/listings/${id}`);
                setListing(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [id]);

//some state conditionals    
    if (loading) return 
        <div>Loading...</div>;

    if (error) return 
        <div>Error: {error.message}</div>;
    
    if (!listing) return 
        <div>No listing found.</div>;

//back btn navigate
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='single-listing-page'>
            <div className='single-page-top'>
                <div className='single-listing-back-btn' onClick={handleBack}>
                    <FaChevronLeft /> Back
                </div>
                <div className='single-listing-header'>
                    <h2>{listing.breed}</h2>
                </div>
                <div className='placeholder'></div>
            </div>
            <div className='single-page-img'>
                <div className='img'>
                    <img src={`${baseURL}/public/uploads/${listing.image}`} alt={`Image of ${listing.breed}`} />   
                </div>
                
            </div>
            <div className='single-page-info'>
                <div className='listing-info'>
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
                        <h4>{comment.user_id ? getEmailCharactersBeforeAtSymbol(comment.user_id) : 'Unknown'}</h4>
                        <p className='comment-text'>{comment.text}</p>
                        <p className='comment-date'>
                            {formatDistanceToNow(new Date(comment.createdAt), { includeSeconds: true })} ago
                        </p>
                    </div>
                    ))}     
                </div>
            </div>
        </div>
    );
};

export default SingleListing;